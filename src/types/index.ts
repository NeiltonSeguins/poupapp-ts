export interface Usuario {
  id: number;
  nome: string;
  renda: number;
  objetivoFinanceiro: "economizar" | "investir" | "controlar-gastos" | null;
}

export interface ITransacao {
  id: number;
  nome: string;
  valor: number;
  tipo: "despesa" | "receita" | "";
  categoria: string;
  data: string;
}

export interface IConta {
  id: number;
  banco: string;
  saldo: number;
}
