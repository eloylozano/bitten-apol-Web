"use client";

import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface CartContextType {
    cartProducts: string[]; // Cambiado a `string[]` para mayor claridad
    setCartProducts: React.Dispatch<React.SetStateAction<string[]>>;
    addProduct: (id: string) => void;
    removeProduct: (id: string) => void; // Añadido para eliminar productos
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

    // Cargar el carrito desde localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartProducts(JSON.parse(savedCart));
        }
    }, []);

    // Guardar el carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);

    // Añadir un producto al carrito
    function addProduct(productId: string) {
        setCartProducts((prev) => [...prev, productId]);
    }

    // Eliminar un producto del carrito
    function removeProduct(productId: string) {
        setCartProducts((prev) => prev.filter(id => id !== productId));
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct }}>
            {children}
        </CartContext.Provider>
    );
}