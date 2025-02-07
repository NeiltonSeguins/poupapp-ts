/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { IConta } from "../types";
import { createConta, getContas } from "../api/contas";

interface ContaContextType {
  contas: IConta[];
  setContas?: (contas: IConta[]) => void;
  criarConta: (novaConta: Omit<IConta, "id">) => Promise<void>;
}

export const ContaContext = createContext<ContaContextType | undefined>(
  undefined
);

export const ContaProvider = ({ children }: { children: ReactNode }) => {
  const [contas, setContas] = useState<IConta[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const dados = await getContas();
        setContas(dados);
      } catch (error) {
        console.error("Erro ao buscar contas", error);
      }
    })();
  }, []);

  const criarConta = async (novaConta: Omit<IConta, "id">) => {
    try {
      const contaCriada = await createConta(novaConta);
      setContas((prev) => [...prev, contaCriada]);
    } catch (error) {
      console.error("Erro ao criar conta", error);
    }
  };

  return (
    <ContaContext.Provider value={{ contas, criarConta }}>
      {children}
    </ContaContext.Provider>
  );
};

export const useContas = () => {
  const context = useContext(ContaContext);
  if (!context) {
    throw new Error("useContas deve ser usado dentro de um ContaProvider");
  }
  return context;
};
