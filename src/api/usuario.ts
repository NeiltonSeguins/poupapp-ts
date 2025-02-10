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

export const updateUsuario = async (id: number, dados: Partial<Usuario>): Promise<Usuario> => {
  const { data } = await api.patch<Usuario>(`/usuarios/${id}`, dados);
  return data;
};
