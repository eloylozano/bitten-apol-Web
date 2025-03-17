import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
