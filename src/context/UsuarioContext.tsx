/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Usuario } from "../types";
import { getUsuarios } from "../api/usuario";

interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario?: (usuario: Usuario | null) => void;
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

  return (
    <UsuarioContext.Provider value={{ usuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
