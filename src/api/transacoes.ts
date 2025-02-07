import { api } from "./index";
import { ITransacao } from "../types";

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
