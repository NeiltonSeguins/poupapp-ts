import axios from "axios";
import { ITransacao, Usuario } from "../types";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await api.get<Usuario[]>("/usuarios");
  return data;
};

export const createUsuario = async (
  usuario: Omit<Usuario, "id" | "orcamentoDiario">
): Promise<Usuario> => {
  const usuarioComOrcamento = {
    ...usuario,
    orcamentoDiario: usuario.renda / 30,
  };

  const { data } = await api.post<Usuario>("/usuarios", usuarioComOrcamento);
  return data;
};

export const updateUsuario = async (
  id: number,
  dados: Partial<Usuario>
): Promise<Usuario> => {
  const { data } = await api.patch<Usuario>(`/usuarios/${id}`, dados);
  return data;
};

export const getTransacoes = async (): Promise<ITransacao[]> => {
  const { data } = await api.get<ITransacao[]>("/transacoes");
  return data;
};

export const createTransacao = async (
  transacao: Omit<ITransacao, "id">
): Promise<ITransacao> => {
  const { data } = await api.post<ITransacao>("/transacoes", transacao);
  return data;
};
