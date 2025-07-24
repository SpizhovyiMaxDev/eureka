import {
  cloneElement,
  createContext,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useKeyPress } from "../hooks/useKeyDown";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

interface ModalContextTypes {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextTypes | undefined>(undefined);

interface ModalProps {
  children?: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");
  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  opens: string;
  children: ReactElement<{ onClick: MouseEventHandler<HTMLButtonElement> }>;
}

function Open({ opens, children }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal.Open must be used within the <Modal>...</Modal>");
  }

  const { open } = context;
  return cloneElement(children, { onClick: () => open(opens) });
}

interface WindowProps {
  name: string;
  children: ReactElement<{ onCloseModal: () => void }>;
}

function Window({ name, children }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal.Window must be used within the <Modal>...</Modal>");
  }

  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);
  useKeyPress("Escape", close);

  if (openName !== name) {
    return null;
  }

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <CloseButton onClick={close}>
          <HiXMark />
        </CloseButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
