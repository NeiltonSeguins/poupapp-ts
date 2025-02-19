export interface Usuario {
  id: number;
  nome: string;
  renda: number;
  orcamentoDiario: number;
}

export interface ITransacao {
  id: number;
  nome: string;
  valor: number;
  tipo: "despesa" | "receita";
  categoria: string;
  data: string;
  userId: number;
}
