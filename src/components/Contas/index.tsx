import { useRef, useState } from "react";
import Conta from "../Conta";
import styled from "styled-components";
import CampoTexto from "../CampoTexto";
import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import Botao from "../Botao";
import Modal, { ModalHandle } from "../Modal";
import Form from "../Form";
import Label from "../Label";
import Fieldset from "../Fieldset";
import WalletIcon from "../Icones/WalletIcon";
import { useContas } from "../../context/ContasContext";
import { IConta } from "../../types";

export const Container = styled(CartaoCorpo)`
  padding: var(--padding-l) var(--padding-m);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListaMovimentacoes = styled.ul`
  list-style: none;
  color: var(--cor-primaria);
  margin: 0;
  padding-left: 0px;
  padding-bottom: var(--padding-m);
  width: 100%;
  height: 200px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Contas = () => {
  const modalRef = useRef<ModalHandle>(null);
  const { contas, criarConta } = useContas();

  const [novaConta, setNovaConta] = useState<Omit<IConta, "id">>({
    banco: "",
    saldo: 0,
  });

  const handleChange = (
    campo: keyof typeof novaConta,
    valor: string | number
  ) => {
    setNovaConta((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleCreateConta = async () => {
    try {
      await criarConta(novaConta);
      setNovaConta({ banco: "", saldo: 0 });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };

  return (
    <Cartao>
      <CartaoCabecalho>Minhas contas</CartaoCabecalho>
      <Container>
        <ListaMovimentacoes>
          {contas.map((conta) => (
            <Conta key={conta.id} banco={conta.banco} saldo={conta.saldo} />
          ))}
        </ListaMovimentacoes>
        <Botao $variante="neutro" onClick={() => modalRef.current?.open()}>
          <WalletIcon />
          Adicionar conta
        </Botao>
        <Modal
          ref={modalRef}
          titulo="Adicionar conta bancária"
          icon={<WalletIcon />}
          onClick={handleCreateConta}
          clickOutsideToClose
        >
          <Form>
            <Fieldset>
              <Label htmlFor="banco">Banco</Label>
              <CampoTexto
                type="text"
                id="banco"
                placeholder="Ex: Anybank"
                value={novaConta.banco}
                onChange={(e) => handleChange("banco", e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="saldo">Saldo</Label>
              <CampoTexto
                type="number"
                id="saldo"
                placeholder="R$ 500,00"
                value={novaConta.saldo}
                onChange={(e) =>
                  handleChange("saldo", parseFloat(e.target.value))
                }
              />
            </Fieldset>
          </Form>
        </Modal>
      </Container>
    </Cartao>
  );
};
export default Contas;
