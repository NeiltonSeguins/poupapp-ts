import { api } from "./index";
import { Transacao } from "../types";

export const getTransacoes = async (): Promise<Transacao[]> => {
  const { data } = await api.get<Transacao[]>("/transacoes");
  return data;
};

export const createTransacao = async (
  transacao: Omit<Transacao, "id">
): Promise<Transacao> => {
  const { data } = await api.post<Transacao>("/transacoes", transacao);
  return data;
};
