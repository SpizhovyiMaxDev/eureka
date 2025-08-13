import {
  createContext,
  Dispatch,
  MouseEvent,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useKeyDown } from "../hooks/useKeyDown";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: Position }>`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusContextProps {
  openId: number;
  close: () => void;
  open: (id: number) => void;
  position: Position | null;
  setPosition: Dispatch<SetStateAction<Position | null>>;
}

const MenusContext = createContext<MenusContextProps | undefined>(undefined);

interface Position {
  x: number;
  y: number;
}

interface MenusProps {
  children: ReactNode;
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<number>(-1);
  const [position, setPosition] = useState<Position | null>(null);
  const close = () => setOpenId(-1);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

interface ToggleProps {
  id: number;
}

function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Menus.Toggle must be used within the <Menus>...</Menus>");
  }

  const { openId, close, open, setPosition } = context;

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const button = (e.target as HTMLElement)?.closest("button");
    if (!button) return;

    const rect: DOMRect = button.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === id ? close() : open(id);
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

interface ListProps {
  id: number;
  children: ReactNode;
}

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Menus.List must be used within the <Menus>...</Menus>");
  }

  const { openId, position, close } = context;
  const ref = useOutsideClick<HTMLUListElement>(close);
  if (id !== openId) return null;

  return createPortal(
    <StyledList ref={ref} position={position as Position}>
      {children}
    </StyledList>,
    document.body
  );
}

interface ButtonProps {
  children: ReactNode;
  icon: ReactElement;
  onClick?: () => void;
}

function Button({ icon, children, onClick }: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Menus.Button must be used within the <Menus>...</Menus>");
  }

  const { close } = context;

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
