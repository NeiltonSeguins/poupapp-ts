export interface Usuario {
  id: number;
  nome: string;
  renda: number;
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
