"use client";

import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter desde next/navigation

interface CartContextType {
  cartProducts: string[];
  setCartProducts: React.Dispatch<React.SetStateAction<string[]>>;
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe estar dentro de un CartContextProvider");
  }
  return context;
}

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<string[]>([]);
  const router = useRouter(); // Usa useRouter para redirigir al usuario

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function addProduct(productId: string) {
    const isAuthenticated = localStorage.getItem("authToken"); // Verifica si el token existe
    if (!isAuthenticated) {
      router.push("/login"); // Redirige al usuario a la página de login
      return;
    }
    setCartProducts((prev) => [...prev, productId]); // Añade el producto al carrito
  }

  function removeProduct(productId: string) {
    setCartProducts((prev) => {
      const index = prev.indexOf(productId);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1); // Elimina solo una instancia del producto
        return newCart;
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}