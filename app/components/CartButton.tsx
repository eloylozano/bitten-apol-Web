import React, { useState, useEffect } from "react";
import Button from "./Button"; // Asegúrate de que tienes un componente Button

import axios from "axios";
import CartIcon from "./icons/CartIcon";
import { useCart } from "./CartContext";

interface CartButtonProps {
  productId: string;
}

const CartButton: React.FC<CartButtonProps> = ({ productId }) => {
  const { addProduct } = useCart(); 
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); 

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await axios.get("/api/auth/me"); 
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false); 
      }
    };

    checkUserSession();
  }, []);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addProduct(productId);  
    } else {
      window.location.href = "/login";  
    }
  };

  return (
    <Button primary onClick={handleAddToCart}>
      <CartIcon />
      Add to cart
    </Button>
  );
};

export default CartButton;
