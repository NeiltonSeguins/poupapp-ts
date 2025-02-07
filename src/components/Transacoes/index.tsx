import { useRef, useState } from "react";
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
import { useTransacoes } from "../../context/TransacoesContext";
import { ITransacao } from "../../types";

const Transacoes = () => {
  const modalRef = useRef<ModalHandle>(null);

  const { transacoes, criarTransacao } = useTransacoes();

  const [novaTransacao, setNovaTransacao] = useState<Omit<ITransacao, "id">>({
    nome: "",
    valor: 0,
    tipo: "",
    categoria: "",
    data: "",
  });

  const handleChange = (
    campo: keyof typeof novaTransacao,
    valor: string | number
  ) => {
    setNovaTransacao((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleCreateTransacao = async () => {
    try {
      await criarTransacao(novaTransacao);
      setNovaTransacao({
        nome: "",
        valor: 0,
        tipo: "",
        categoria: "",
        data: "",
      });
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  };

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
          onClick={handleCreateTransacao}
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
                  handleChange("nome", e.target.value)
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
                  handleChange("valor", parseFloat(e.target.value))
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="tipo">Tipo</Label>
              <SelectGroup
                id="tipo"
                value={novaTransacao.tipo}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange("tipo", e.target.value)
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
                  handleChange("data", e.target.value)
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
                  handleChange("categoria", e.target.value)
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
