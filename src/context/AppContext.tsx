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
  criarTransacao: (
    novaTransacao: Omit<ITransacao, "id" | "userId">
  ) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);

  const carregarDados = async () => {
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
  };

  useEffect(() => {
    carregarDados();
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

  const criarTransacao = async (
    novaTransacao: Omit<ITransacao, "id" | "userId">
  ) => {
    try {
      if (!usuario) {
        throw new Error(
          "Não podemos criar transações sem um usuário associado"
        );
      }

      const { transacao, novoOrcamentoDiario } = await createTransacao(
        novaTransacao,
        usuario
      );

      setTransacoes((prev) => [...prev, transacao]);
      setUsuario((prev) =>
        prev ? { ...prev, orcamentoDiario: novoOrcamentoDiario } : null
      );
    } catch (error) {
      console.error("Erro ao criar transação", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        criarUsuario,
        transacoes,
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
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
};
