import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { primary } from "../lib/colors";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface ButtonProps {
  children: ReactNode;
  white?: boolean;
  grey?: boolean;
  block?: boolean;
  outline?: boolean;
  primary?: boolean;
  size?: "s" | "m" | "l";
  onClick?: () => void;
  showToast?: boolean;
  toastMessage?: string;
  type?: "button" | "submit" | "reset"; // Agregar esto para permitir el tipo 'submit'
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
    `};

  ${(props) =>
    props.size === "s" &&
    css`
      font-size: 0.8rem; /* Tamaño más pequeño */
      padding: 3px 10px; /* Ajustar el padding */
    `}
`;

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "white",
      "outline",
      "grey",
      "block",
      "primary",
      "size",
      "showToast",
      "toastMessage",
    ].includes(prop as string),
})<ButtonProps>`
  ${ButtonStyle}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  showToast,
  toastMessage,
  type = "button",
  ...rest
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (onClick) {
      onClick();
    }

    if (showToast) {
      toast.success(toastMessage || "Acción completada", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <StyledButton type={type} {...rest} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
