import BarraLateral from "../../components/BarraLateral";
import BarraPesquisa from "../../components/BarraPesquisa";
import SaudacaoUsuario from "../../components/SaudacaoUsuario";
import OrcamentoDiario from "../../components/OrcamentoDiario";
import Transacoes from "../../components/Transacoes";
import BalancoFinanceiro from "../../components/BalancoFinanceiro";
import {
  Container,
  Movimentacoes,
  Orcamento,
  TransacoesWrapper,
} from "./style";

function Home() {
  return (
    <Container>
      <BarraLateral />
      <BarraPesquisa />
      <SaudacaoUsuario />
      <Orcamento>
        <OrcamentoDiario />
      </Orcamento>
      <Movimentacoes>
        <BalancoFinanceiro />
      </Movimentacoes>
      <TransacoesWrapper>
        <Transacoes />
      </TransacoesWrapper>
    </Container>
  );
}

export default Home;
