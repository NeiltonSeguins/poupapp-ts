/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { ITransacao } from "../types";
import { createTransacao, getTransacoes } from "../api/transacoes";
import { useUsuario } from "./UsuarioContext";

interface TransacaoContextType {
  transacoes: ITransacao[];
  calcularGastosPorCategoria: () => Record<string, number>;
  setTransacoes?: (transacoes: ITransacao[]) => void;
  criarTransacao: (novaTransacao: Omit<ITransacao, "id">) => Promise<void>;
}

export const TransacaoContext = createContext<TransacaoContextType | undefined>(
  undefined
);

export const TransacaoProvider = ({ children }: { children: ReactNode }) => {
  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
  const { atualizaOrcamentoDiario } = useUsuario();

  useEffect(() => {
    (async () => {
      try {
        const dados = await getTransacoes();
        setTransacoes(dados);
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      }
    })();
  }, []);

  const criarTransacao = async (novaTransacao: Omit<ITransacao, "id">) => {
    try {
      const transacaoCriada = await createTransacao(novaTransacao);
      atualizaOrcamentoDiario({ ...novaTransacao, id: transacaoCriada.id });
      setTransacoes((prev) => [...prev, transacaoCriada]);
    } catch (error) {
      console.error("Erro ao criar transação", error);
    }
  };

  const calcularGastosPorCategoria = () => {
    return transacoes
      .filter((transacao) => transacao.tipo === "despesa")
      .reduce<Record<string, number>>((acc, transacao) => {
        acc[transacao.categoria] =
          (acc[transacao.categoria] || 0) + transacao.valor;
        return acc;
      }, {});
  };

  return (
    <TransacaoContext.Provider
      value={{ transacoes, criarTransacao, calcularGastosPorCategoria }}
    >
      {children}
    </TransacaoContext.Provider>
  );
};

export const useTransacoes = () => {
  const context = useContext(TransacaoContext);
  if (!context) {
    throw new Error(
      "useTransacoes deve ser usado dentro de um TransacaoProvider"
    );
  }
  return context;
};
