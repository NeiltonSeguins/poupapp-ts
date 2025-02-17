export interface Usuario {
  id: number;
  nome: string;
  renda: number;
  orcamentoDiario: number;
  transacoes: ITransacao[];
}

export interface ITransacao {
  id: number;
  nome: string;
  valor: number;
  tipo: "despesa" | "receita" | ""; //Não pode ser nulo nem uma string vazia
  categoria: string;
  data: string;
}