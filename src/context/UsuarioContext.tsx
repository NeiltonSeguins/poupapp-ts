/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { ITransacao, Usuario } from "../types";
import { getUsuarios, createUsuario, updateUsuario } from "../api/usuario";

const DIAS_DO_MES = 30;

interface UsuarioContextType {
  usuario: Usuario | null;
  orcamentoDiario: number;
  calculaOrcamentoDiario: () => void;
  atualizaOrcamentoDiario: (transacao: ITransacao) => void;
  criarUsuario: (dados: Omit<Usuario, "id">) => Promise<void>;
}

export const UsuarioContext = createContext<UsuarioContextType | undefined>(
  undefined
);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [orcamentoDiario, setOrcamentoDiario] = useState<number>(0);

   // Morre e vira uma prop do usuário
  const calculaOrcamentoDiario = (renda?: number) => {
    if (!usuario && renda === undefined) return;
    setOrcamentoDiario(Math.floor((renda ?? usuario!.renda) / DIAS_DO_MES));
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await getUsuarios();
        setUsuario(user[0]);
        calculaOrcamentoDiario(user[0].renda); // Some daqui
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
      }
    })();
  }, []);

  const criarUsuario = async (dados: Omit<Usuario, "id">) => {
    try {
      const novoUsuario = await createUsuario(dados);
      // Função calcula orcamento diário
      setUsuario(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  // Usar um reduce para calcular aqui
  const atualizaOrcamentoDiario = async (transacao: ITransacao) => {
    setOrcamentoDiario((prev) => {
      const valor = Math.abs(transacao.valor);
      return transacao.tipo !== "receita" ? prev - valor : prev + valor;
    });

    if (!usuario) return;

    try {
      const novoOrcamento =
        orcamentoDiario -
        (transacao.tipo !== "receita" ? transacao.valor : -transacao.valor);
      await updateUsuario(usuario.id, {
        renda: novoOrcamento * DIAS_DO_MES,
      });
    } catch (error) {
      console.error("Erro ao atualizar orçamento na API", error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        orcamentoDiario,
        calculaOrcamentoDiario,
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
