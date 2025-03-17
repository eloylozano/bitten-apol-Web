"use client";

import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import Title from "./Title";
import Button from "./StyledButton"; // Importa el Button funcional

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 0px;
  
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
  margin: 25px 0 0 0;
  display: flex;
  gap: 20px;
`;

interface Product {
  _id: string;
  title: string;
  description: string;
}

interface FeaturedProps {
  product?: Product;
}

export default function Featured({ product }: FeaturedProps) {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartContextProvider");
  }

  const { addProduct } = cartContext;

  function addFeaturedToCart() {
    if (product?._id) {
      addProduct(product._id);
    }
  }

  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{product?.title}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={`/product/${product?._id}`} outline={1} white={1} >
                  Read more
                </ButtonLink>
                <Button primary onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://bitten-apol.s3.amazonaws.com/1740912156478.png"
              alt="Main product"
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}