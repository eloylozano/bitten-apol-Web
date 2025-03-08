"use client"

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await axios.get("/api/auth/me");

        if (res.status === 200) {
          setUser(res.data);
        } else {
          window.location.href = "/login"; // Redirige si la sesión no es válida
        }
      } catch (error) {
        window.location.href = "/login"; // Redirige si hay error
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