import { api } from "./index";
import { IConta } from "../types";

export const getContas = async (): Promise<IConta[]> => {
  const { data } = await api.get<IConta[]>("/contas");
  return data;
};

export const createConta = async (conta: Omit<IConta, "id">): Promise<IConta> => {
  const { data } = await api.post<IConta>("/contas", conta);
  return data;
};
