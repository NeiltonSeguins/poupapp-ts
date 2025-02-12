import styled from "styled-components";
import { Cartao, CartaoCabecalho, Descricao, CartaoCorpo } from "../Cartao";
import PigIcon from "../Icones/PigIcon.tsx";
import BarraProgresso from "./BarraProgresso.tsx";
import { useUsuario } from "../../context/UsuarioContext.tsx";

export const TituloMetaFinanceira = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-xs);
  font-size: var(--fonte-l);
  color: var(--cor-secundaria-receita);
  margin: 0;
`;

const MetaFinanceira = () => {
  const { objetivoFinanceiroAtual } = useUsuario();
  return (
    <Cartao>
      <CartaoCabecalho>Progresso da meta financeira</CartaoCabecalho>
      <CartaoCorpo>
        <Descricao>
          <TituloMetaFinanceira>
            <PigIcon />
            {objetivoFinanceiroAtual}
          </TituloMetaFinanceira>
          <BarraProgresso />
        </Descricao>
      </CartaoCorpo>
    </Cartao>
  );
};
export default MetaFinanceira;
