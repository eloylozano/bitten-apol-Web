import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { primary } from "../lib/colors";

interface ButtonProps {
  children: ReactNode;
  white?: boolean;
  grey?: boolean;
  block?: boolean;
  outline?: boolean;
  primary?: boolean;
  size?: "s" | "m" | "l";
  onClick?: () => void;
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
  shouldForwardProp: (prop) => !["white", "outline", "grey", "block", "primary", "size"].includes(prop as string),
}) <ButtonProps>`
  ${ButtonStyle}
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
