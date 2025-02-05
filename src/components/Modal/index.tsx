import React, {
  forwardRef,
  ReactNode,
  useRef,
} from "react";
import { ButtonGroup, CloseButton, ModalContainer, ModalHeader } from "./style";
import Botao from "../Botao";

interface ModalProps {
  icon: React.ReactNode;
  titulo: string;
  children: ReactNode;
  onClick: () => void;
  clickOutsideToClose?: boolean;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ icon, titulo, children, onClick, }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <ModalContainer ref={dialogRef}>
        <ModalHeader>
          <div>
            {icon}
            {titulo}
          </div>
          <CloseButton >x</CloseButton>
        </ModalHeader>
        <section>
          {children}
          <ButtonGroup>
            <Botao $variante="secundario" >
              Cancelar
            </Botao>
            <Botao
              $variante="primario"
              onClick={() => {
                onClick();
              }}
            >
              Adicionar
            </Botao>
          </ButtonGroup>
        </section>
      </ModalContainer>
    );
  }
);

export default Modal;
