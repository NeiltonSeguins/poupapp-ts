import { useState } from "react";
import {
  Section,
  Container,
  Title,
  Description,
  Illustration,
  SectionWrapper,
} from "./style.js";
import CampoTexto from "../../components/CampoTexto";
import Botao from "../../components/Botao";
import Label from "../../components/Label";
import Fieldset from "../../components/Fieldset";
import { RadioGroup, RadioInput } from "../../components/BotaoRadio";
import Form from "../../components/Form";
import ilustracao from "../../assets/images/ilustracao-cadastro.png";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../types/index.js";
import { useUsuario } from "../../context/UsuarioContext.js";

type FormFields = "nome" | "renda" | "objetivoFinanceiro";

const Cadastro = () => {
  const { criarUsuario } = useUsuario();
  const [form, setForm] = useState<Omit<Usuario, "id">>({
    nome: "",
    renda: 0,
    objetivoFinanceiro: null,
  });

  const handleChange = (campo: FormFields, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    criarUsuario(form);
    navigate("/home");
  };

  return (
    <Section>
      <SectionWrapper>
        <Container>
          <Title>Configuração financeira</Title>
          <Description>
            Boas-vindas à plataforma que protege seu bolso! Antes de começar,
            precisamos de algumas informações sobre sua rotina financeira. Vamos
            lá?
          </Description>
          <Form>
            <Fieldset>
              <Label htmlFor="nome">Nome</Label>
              <CampoTexto
                type="text"
                name="nome"
                value={form.nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("nome", e.target.value)
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="renda">Renda mensal total</Label>
              <CampoTexto
                type="text"
                name="renda"
                value={form.renda}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("renda", e.target.value)
                }
              />
            </Fieldset>
            <Fieldset>
              <Label>Selecione seu objetivo financeiro:</Label>
              <RadioGroup>
                <RadioInput>
                  <input
                    type="radio"
                    name="objetivoFinanceiro"
                    id="economizar"
                    value="economizar"
                    checked={form.objetivoFinanceiro === "economizar"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("objetivoFinanceiro", e.target.value)
                    }
                  />
                  <Label htmlFor="economizar">Economizar</Label>
                </RadioInput>
                <RadioInput>
                  <input
                    type="radio"
                    name="objetivoFinanceiro"
                    id="investir"
                    value="investir"
                    checked={form.objetivoFinanceiro === "investir"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("objetivoFinanceiro", e.target.value)
                    }
                  />
                  <Label htmlFor="investir">Investir</Label>
                </RadioInput>
                <RadioInput>
                  <input
                    type="radio"
                    name="objetivoFinanceiro"
                    id="controle-gastos"
                    value="controlar-gastos"
                    checked={form.objetivoFinanceiro === "controlar-gastos"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("objetivoFinanceiro", e.target.value)
                    }
                  />
                  <Label htmlFor="controle-gastos">Controlar gastos</Label>
                </RadioInput>
              </RadioGroup>
            </Fieldset>
          </Form>
          <Botao $variante="primario" onClick={handleSubmit}>
            Ir para o app
          </Botao>
        </Container>
        <Illustration
          src={ilustracao}
          alt="ilustração da tela de cadastro. Um avatar mexendo em alguns gráficos"
        />
      </SectionWrapper>
    </Section>
  );
};

export default Cadastro;
