"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface CartContextType {
    cartProducts: any[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addProduct: (id: string) => void;
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
    const [cartProducts, setCartProducts] = useState<any[]>([]);

    function addProduct(productId: string) {
        setCartProducts((prev) => [...prev, productId]);
    };

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
            {children}
        </CartContext.Provider>
    );
}
