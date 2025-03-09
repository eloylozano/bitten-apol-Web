"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import Link from "next/link";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const LoginLink = styled(Link)`
  color: #aaa;
  padding-bottom: 20px;
  text-decoration: underline;
  transition: 0.1s ease-in-out;

  &:hover {
    color: #252525;
  }
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 10px 0 20px;
  font-weight: bold;
  font-size: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Por favor, ingresa todos los campos.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem("authToken", data.token); // Guarda el token en localStorage
        router.push("/"); // Redirige al usuario a la página principal
      } else {
        setError(data.message || "Error en la autenticación.");
      }
    } catch (error) {
      setError("Hubo un error en la conexión.");
    }
  };

  return (
    <>
      <Header />
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Iniciar sesión</Title>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LoginLink href="/register">¿No tienes cuenta?</LoginLink>
          <ButtonContainer>
            <Button primary={true} type="submit">
              Iniciar sesión
            </Button>
          </ButtonContainer>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default Login;