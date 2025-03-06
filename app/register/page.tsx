"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const RegisterForm = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 10px 0 20px;
  font-weight: bold;
  font-size: 2rem;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica de los campos
    if (!email || !password || !confirmPassword) {
      setError("Por favor, ingresa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Realizar la llamada a la API para el registro
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Si el registro es exitoso, redirigir al login
        router.push("/login"); // Redirigir a la página de login
      } else {
        setError(data.message || "Error en el registro.");
      }
    } catch (error) {
      setError("Hubo un error en la conexión.");
    }
  };

  return (
    <>
      <Header />
      <RegisterContainer>
        <RegisterForm onSubmit={handleSubmit}>
          <Title>Crear cuenta</Title>
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
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonContainer>
            <Button primary={true} type="submit">
              Crear cuenta
            </Button>
          </ButtonContainer>
        </RegisterForm>
      </RegisterContainer>
    </>
  );
};

export default Register;
