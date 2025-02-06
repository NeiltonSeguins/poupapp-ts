/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { ITransacao } from "../types";
import { getTransacoes } from "../api/transacoes";

interface TransacaoContextType {
  transacoes: ITransacao[];
  setTransacoes?: (transacoes: ITransacao[]) => void;
}

export const TransacaoContext = createContext<TransacaoContextType | undefined>(
  undefined
);

export const TransacaoProvider = ({ children }: { children: ReactNode }) => {
  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);

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

  return (
    <TransacaoContext.Provider value={{ transacoes }}>
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
