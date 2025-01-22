import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import styled from "styled-components";

export const AreaChart = styled.div`
  padding: var(--padding-xs);
  width: 50%;
  height: 50%;
`;

const BalancoFinanceiro = () => {
  return (
    <Cartao>
      <CartaoCabecalho>Gastos por categoria</CartaoCabecalho>
      <CartaoCorpo>
        <AreaChart>// Aqui vai o gráfico</AreaChart>
      </CartaoCorpo>
    </Cartao>
  );
};
export default BalancoFinanceiro;
