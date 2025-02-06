import { useEffect, useRef, useState } from "react";
import MoneyIcon from "../Icones/MoneyIcon";
import { Container, ListaMovimentacoes } from "../Contas";
import Transacao from "../Transacao";
import { Cartao, CartaoCabecalho } from "../Cartao";
import Botao from "../Botao";
import Modal, { ModalHandle } from "../Modal";
import { Form } from "react-router-dom";
import Fieldset from "../Fieldset";
import Label from "../Label";
import CampoTexto from "../CampoTexto";
import { SelectGroup, SelectOption } from "../Select";
import { ITransacao } from "../../types";
import { getTransacoes } from "../../api/transacoes";

const Transacoes = () => {
  const modalRef = useRef<ModalHandle>(null);

  const [novaTransacao, setNovaTransacao] = useState({
    nome: "",
    valor: 0,
    tipo: "",
    categoria: "",
    data: "",
  });

  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);

  const fetchUser = async () => {
    const response = await getTransacoes();
    setTransacoes(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Cartao>
      <CartaoCabecalho>Movimentação financeira</CartaoCabecalho>
      <Container>
        <ListaMovimentacoes>
          {transacoes.map((transacao) => (
            <Transacao
              key={transacao.id}
              tipo={transacao.tipo}
              nome={transacao.nome}
              valor={transacao.valor}
              data={transacao.data}
            />
          ))}
        </ListaMovimentacoes>
        <Botao $variante="neutro" onClick={() => modalRef.current?.open()}>
          <MoneyIcon />
          Adicionar transação
        </Botao>
        <Modal
          onClick={() => console.log("Adicionando transação")}
          ref={modalRef}
          titulo="Adicionar transação"
          icon={<MoneyIcon />}
        >
          <Form>
            <Fieldset>
              <Label htmlFor="nomeTransacao">Nome da transação</Label>
              <CampoTexto
                type="text"
                id="nomeTransacao"
                placeholder="Ex: Compra na padaria"
                value={novaTransacao.nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({ ...novaTransacao, nome: e.target.value })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Valor</Label>
              <CampoTexto
                type="number"
                id="valor"
                placeholder="10"
                value={novaTransacao.valor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    valor: parseFloat(e.target.value),
                  })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="tipo">Tipo</Label>
              <SelectGroup
                id="tipo"
                value={novaTransacao.tipo}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    tipo: e.target.value,
                  })
                }
              >
                <SelectOption value="">Selecione o tipo</SelectOption>
                <SelectOption value="receita">Receita</SelectOption>
                <SelectOption value="despesa">Despesa</SelectOption>
              </SelectGroup>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Data</Label>
              <CampoTexto
                type="date"
                id="valor"
                placeholder="dd/mm/aaaa"
                value={novaTransacao.data}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    data: e.target.value,
                  })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="categoria">Categoria</Label>
              <CampoTexto
                type="text"
                id="categoria"
                placeholder="Alimentação"
                value={novaTransacao.categoria}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNovaTransacao({
                    ...novaTransacao,
                    categoria: e.target.value,
                  })
                }
              />
            </Fieldset>
          </Form>
        </Modal>
      </Container>
    </Cartao>
  );
};
export default Transacoes;
