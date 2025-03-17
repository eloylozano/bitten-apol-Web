import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ButtonStyle } from "./StyledButton";

const StyledLink = styled(Link).attrs({
  passHref: true, // Necesario para propagar el atributo href
})`
  ${ButtonStyle} 
`;

interface ButtonLinkProps {
  href: string;
  [key: string]: any; // Permite pasar otras props como 'className', 'style', etc.
}

export default function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return <StyledLink href={href} {...props} />;
}
