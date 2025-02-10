import { Cartao, CartaoCabecalho, CartaoCorpo, Descricao } from "../Cartao";
import { useUsuario } from "../../context/UsuarioContext";

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const OrcamentoDiario = () => {
  const { orcamentoDiario } = useUsuario();

  return (
    <Cartao>
      <CartaoCabecalho>Orçamento diário disponível</CartaoCabecalho>
      <CartaoCorpo>
        <Descricao>{formatador.format(orcamentoDiario)}</Descricao>
      </CartaoCorpo>
    </Cartao>
  );
};
export default OrcamentoDiario;
