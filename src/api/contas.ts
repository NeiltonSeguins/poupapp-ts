import { api } from "./index";
import { Conta } from "../types";

export const getContas = async (): Promise<Conta[]> => {
  const { data } = await api.get<Conta[]>("/contas");
  return data;
};

export const createConta = async (conta: Omit<Conta, "id">): Promise<Conta> => {
  const { data } = await api.post<Conta>("/contas", conta);
  return data;
};
