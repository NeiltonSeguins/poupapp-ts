/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { ITransacao, Usuario } from "../types";
import {
  getUsuarios,
  createUsuario,
  getTransacoes,
  createTransacao,
} from "../api";

interface AppContextType {
  usuario: Usuario | null;
  criarUsuario: (
    dados: Omit<Usuario, "id" | "orcamentoDiario">
  ) => Promise<void>;
  transacoes: ITransacao[];
  calcularGastosPorCategoria: () => Record<string, number>;
  criarTransacao: (novaTransacao: Omit<ITransacao, "id">) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const users = await getUsuarios();
        const transacoes = await getTransacoes();
        if (users.length > 0) {
          setUsuario(users[0]);
          setTransacoes(transacoes);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
      }
    })();
  }, []);

  const criarUsuario = async (
    dados: Omit<Usuario, "id" | "orcamentoDiario">
  ) => {
    try {
      const novoUsuario = await createUsuario(dados);
      setUsuario(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  const criarTransacao = async (novaTransacao: Omit<ITransacao, "id">) => {
    try {
      const transacaoCriada = await createTransacao(novaTransacao);
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
    <AppContext.Provider
      value={{
        usuario,
        criarUsuario,
        transacoes,
        calcularGastosPorCategoria,
        criarTransacao,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um UsuarioProvider");
  }
  return context;
};
