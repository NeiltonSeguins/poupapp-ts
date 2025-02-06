import { api } from "./index";
import { Usuario } from "../types";

export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await api.get<Usuario[]>("/usuarios");
  return data;
};

export const createUsuario = async (
  usuario: Omit<Usuario, "id">
): Promise<Usuario> => {
  const { data } = await api.post<Usuario>("/usuarios", usuario);
  return data;
};
