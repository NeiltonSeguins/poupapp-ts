/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { ITransacao, Usuario } from "../types";
import { getUsuarios, createUsuario } from "../api/usuario";

const DIAS_DO_MES = 30;

interface UsuarioContextType {
  usuario: Usuario | null;
  orcamentoDiario: number;
  calculaOrcamentoDiario: () => void;
  atualizaOrcamentoDiario: (transacao: ITransacao) => void;
  atualizaOrcamentoComSaldo: (saldo: number) => void;
  setUsuario?: (usuario: Usuario | null) => void;
  criarUsuario: (dados: Omit<Usuario, "id">) => Promise<void>;
}

export const UsuarioContext = createContext<UsuarioContextType | undefined>(
  undefined
);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [orcamentoDiario, setOrcamentoDiario] = useState<number>(0);

  const calculaOrcamentoDiario = useCallback((renda?: number) => {
    if (!usuario && renda === undefined) return;
    setOrcamentoDiario(Math.floor((renda ?? usuario!.renda) / DIAS_DO_MES));
  }, [usuario]);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUsuarios();
        setUsuario(user[0]);
        calculaOrcamentoDiario(user[0].renda);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
      }
    })();
  }, []);

  const criarUsuario = async (dados: Omit<Usuario, "id">) => {
    try {
      const novoUsuario = await createUsuario(dados);
      setUsuario(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  const atualizaOrcamentoDiario = (transacao: ITransacao) => {
    setOrcamentoDiario((prev) => {
      const valor = Math.abs(transacao.valor);
      return transacao.tipo !== "receita" ? prev - valor : prev + valor;
    });
  };

  const atualizaOrcamentoComSaldo = (saldo: number) => {
    setOrcamentoDiario((prev) => prev + saldo);
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        orcamentoDiario,
        calculaOrcamentoDiario,
        atualizaOrcamentoComSaldo,
        atualizaOrcamentoDiario,
        criarUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario deve ser usado dentro de um UsuarioProvider");
  }
  return context;
};
