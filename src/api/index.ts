import axios from "axios";
import { ITransacao, Usuario } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Usuários
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

// Transações
export const getTransacoes = async (): Promise<ITransacao[]> => {
  const { data } = await api.get<ITransacao[]>("/transacoes");
  return data;
};

export const createTransacao = async (
  transacao: Omit<ITransacao, "id" | "userId">,
  usuario: Omit<Usuario, "nome">
): Promise<{ transacao: ITransacao; novoOrcamentoDiario: number }> => {
  const transacaoComUsuario = { ...transacao, userId: usuario.id };

  const { data } = await api.post<ITransacao>(
    "/transacoes",
    transacaoComUsuario
  );

  const transacoes = await getTransacoes();
  const saldo = calcularSaldo(transacoes);

  const novoOrcamentoDiario = usuario.renda / 30 + saldo;

  await updateUsuario(usuario.id, {
    orcamentoDiario: novoOrcamentoDiario,
  }).catch((error) => console.error("Erro ao atualizar orçamento", error));

  return { transacao: data, novoOrcamentoDiario };
};

const calcularSaldo = (transacoes: ITransacao[]): number => {
  return transacoes.reduce((total, transacao) => {
    return transacao.tipo === "receita"
      ? total + transacao.valor
      : total - transacao.valor;
  }, 0);
};
