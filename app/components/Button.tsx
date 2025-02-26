import React from "react";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  color: #252525;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
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
    props.primary &&
    css`
      background-color: #5542f6;
      border: 1px solid #5542f6;
      color: white;
    `}
${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `}
  svg {
    height: 25px;
  }
`;

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["white", "outline", "primary", "size"].includes(prop),
})`
  ${ButtonStyle} 
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
