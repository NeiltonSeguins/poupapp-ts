import { useEffect, useState } from "react";
import styled from "styled-components";
import { Usuario } from "../../types";
import { getUsuarios } from "../../api/usuario";

export const StyledUsuario = styled.div`
  grid-area: usuario;
  color: var(--cor-neutra-light);

  & > h1 {
    margin: 16px 0 0 0;
  }

  & > p {
    margin: 8px 0 16px 0;
  }
`;

const SaudacaoUsuario = () => {
  const [user, setUser] = useState<Usuario | null>(null);

  const fetchUser = async () => {
    const response = await getUsuarios();
    setUser(response[0]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <StyledUsuario>
      <h1>Olá, {user?.nome}</h1>
      <p>Veja como estão suas finanças hoje.</p>
    </StyledUsuario>
  );
};

export default SaudacaoUsuario;
