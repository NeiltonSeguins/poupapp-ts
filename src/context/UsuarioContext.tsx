/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Usuario } from "../types";
import { getUsuarios, createUsuario } from "../api/usuario";

interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario?: (usuario: Usuario | null) => void;
  criarUsuario: (dados: Omit<Usuario, "id">) => Promise<void>;
}

export const UsuarioContext = createContext<UsuarioContextType | undefined>(
  undefined
);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUsuarios();
        setUsuario(user[0]);
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

  return (
    <UsuarioContext.Provider value={{ usuario, criarUsuario }}>
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
