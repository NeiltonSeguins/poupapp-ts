import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import styled from "styled-components";
import { useTransacoes } from "../../context/TransacoesContext";

export const AreaChart = styled.div`
  padding: var(--padding-xs);
  width: 100%;
  height: 100%;
`;

const BalancoFinanceiro = () => {
  const { calcularGastosPorCategoria } = useTransacoes();
  const gastosPorCategoria = calcularGastosPorCategoria();

  const data = Object.entries(gastosPorCategoria).map(
    ([categoria, gastos]) => ({
      categoria,
      gastos,
    })
  );

  return (
    <Cartao>
      <CartaoCabecalho>Gastos por categoria</CartaoCabecalho>
      <CartaoCorpo>
        <AreaChart>
          <BarChart width={730} height={250} data={data}>
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="gastos" fill="#f87828" />
          </BarChart>
        </AreaChart>
      </CartaoCorpo>
    </Cartao>
  );
};
export default BalancoFinanceiro;
