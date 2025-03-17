"use client";

import { useRouter } from "next/router";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthContextProvider");
  }
  return context;
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  // Leer el estado de autenticación desde el localStorage
  const storedAuthState = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storedAuthState !== null);

  useEffect(() => {
    // Verificar si el token está presente en localStorage al iniciar la aplicación
    if (storedAuthState) {
      setIsAuthenticated(true);
    }
  }, [storedAuthState]);

  const login = () => {
    setIsAuthenticated(true);
    // También puedes guardar el token en localStorage en esta función si no lo has hecho antes
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}