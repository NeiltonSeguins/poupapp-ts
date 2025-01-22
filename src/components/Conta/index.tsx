import styled from "styled-components";
import BankIcon from "../Icones/BankIcon";

export const ItemConta = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--padding-m) 0;
  border-bottom: 1px solid var(--cor-neutra-medium);
  color: var(--cor-neutra-light);

  &:nth-child(1) {
    padding-top: 0;
  }
`;

export const TituloConta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-xs);

  & > h3 {
    margin: 0;
  }
`;

export const SaldoConta = styled.div`
  text-align: start;

  & > p {
    margin: 0;
  }
`;

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

type ContaProps = {
  banco: string;
  saldo: number;
};

const Conta = ({ banco, saldo }: ContaProps) => {
  return (
    <ItemConta>
      <TituloConta>
        <BankIcon />
        <h3>{banco}</h3>
      </TituloConta>
      <SaldoConta>
        <p>Saldo</p>
        <span>{formatador.format(saldo)}</span>
      </SaldoConta>
    </ItemConta>
  );
};

export default Conta;
