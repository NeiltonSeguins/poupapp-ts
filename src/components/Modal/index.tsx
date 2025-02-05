import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
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
  ({ icon, titulo, children, onClick, clickOutsideToClose = true }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const closeModal = () => {
      dialogRef.current?.close();
    };

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: closeModal,
    }));

    const closeOnBackdropClick = (
      event: React.MouseEvent<HTMLDialogElement, MouseEvent>
    ) => {
      if (clickOutsideToClose && event.target === dialogRef.current) {
        closeModal();
      }
    };

    return (
      <ModalContainer ref={dialogRef} onClick={closeOnBackdropClick}>
        <ModalHeader>
          <div>
            {icon}
            {titulo}
          </div>
          <CloseButton onClick={closeModal}>x</CloseButton>
        </ModalHeader>
        <section>
          {children}
          <ButtonGroup>
            <Botao $variante="secundario" onClick={closeModal}>
              Cancelar
            </Botao>
            <Botao
              $variante="primario"
              onClick={() => {
                onClick();
                closeModal();
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
