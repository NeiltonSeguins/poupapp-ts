export interface Usuario {
  id: number;
  nome: string;
  email: string;
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
