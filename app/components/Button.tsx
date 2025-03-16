import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { primary } from "../lib/colors";
import { toast } from 'react-toastify'; // Importa toast

interface ButtonProps {
  children: ReactNode;
  white?: boolean;
  grey?: boolean;
  block?: boolean;
  outline?: boolean;
  primary?: boolean;
  size?: "s" | "m" | "l";
  onClick?: () => void;
  showToast?: boolean; // Nueva prop para controlar el pop-up
  toastMessage?: string; // Mensaje personalizado para el pop-up
}

export const ButtonStyle = css<ButtonProps>`
  color: #252525;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 500;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #252525;
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

    ${(props) =>
    props.grey &&
    css`
      background-color: #252525;
      color: #fff;
      border: 1px solid #252525;
    `}
  

  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: white;
    `}

  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}
  ${(props) =>
    props.block &&
    css`
      display: block;
    `}


  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `}
`;

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["white", "outline", "grey", "block", "primary", "size", "showToast", "toastMessage"].includes(
      prop as string
    ),
})<ButtonProps>`
  ${ButtonStyle}
`;

const Button: React.FC<ButtonProps> = ({ children, onClick, showToast, toastMessage, ...rest }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Ejecuta la función onClick si está definida
    }

    if (showToast) {
      toast.success(toastMessage || "Acción completada", { // Muestra el pop-up si showToast es true
        position: "top-right", // Posición del pop-up
        autoClose: 2000, // Duración del pop-up (2 segundos)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <StyledButton {...rest} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default Button;