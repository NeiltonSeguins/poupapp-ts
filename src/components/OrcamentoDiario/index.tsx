import { useEffect, useState } from "react";
import { getUsuarios } from "../../api/usuario";
import { Cartao, CartaoCabecalho, CartaoCorpo, Descricao } from "../Cartao";
import { Usuario } from "../../types";

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const OrcamentoDiario = () => {
  const [user, setUser] = useState<Usuario | null>(null);

  const fetchUser = async () => {
    const response = await getUsuarios();
    setUser(response[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Cartao>
      <CartaoCabecalho>Orçamento diário disponível</CartaoCabecalho>
      <CartaoCorpo>
        <Descricao>{user ? formatador.format(user.renda) : "Carregando..."}</Descricao>
      </CartaoCorpo>
    </Cartao>
  );
};
export default OrcamentoDiario;
