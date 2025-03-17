import React from "react";
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { primary } from "../lib/colors";
import { useCart } from "./CartContext"; // Usa useCart en lugar de useContext
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface ProductBoxProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Title = styled(Link)`
  font-size: 1rem;
  font-weight: normal;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${primary};
`;

const ProductBox: React.FC<ProductBoxProps> = ({
  _id,
  title,
  description,
  price,
  images,
}) => {
  const url = "/product/" + _id;
  const { addProduct } = useCart();
  const { isAuthenticated } = useAuth(); // <-- Aquí usas el contexto
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectAfterLogin", JSON.stringify({ action: "addToCart", productId: _id }));
      router.push("/login");
      return;
    }
    addProduct(_id);
  };
  
  return (
    <ProductWrapper>
      <div>
        <WhiteBox href={url}>
          <img src={images[0]} alt="Imagen del producto" />
        </WhiteBox>
      </div>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{price} €</Price>
          <Button grey={true} onClick={handleAddToCart} outline>
            <CartIcon />
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
