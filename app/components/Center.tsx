import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
`;

interface CenterProps {
  children: ReactNode;
}

export default function Center({ children }: CenterProps) {
  return <StyledDiv>{children}</StyledDiv>;
}