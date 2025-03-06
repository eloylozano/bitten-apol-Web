"use client";  // Directiva para marcar este archivo como cliente

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null); // Especificar el tipo

  useEffect(() => {
    const checkUserSession = async () => {
      const res = await axios.get("/api/auth/me");
      if (res.status === 200) {
        setUser(res.data);
      } else {
        window.location.href = "/login"; // Redirige a la página de login si no está logeado
      }
    };

    checkUserSession();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Account Information</h1>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default AccountPage;
