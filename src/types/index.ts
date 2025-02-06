export interface Usuario {
  id: number;
  nome: string;
  renda: number;
  objetivoFinanceiro: "economizar" | "investir" | "controlar-gastos" | null;
}

export interface Transacao {
  id: number;
  nome: string;
  valor: number;
  tipo: "despesa" | "receita";
  categoria: string;
  data: string;
}

export interface Conta {
  id: number;
  nome: string;
  saldo: number;
}
