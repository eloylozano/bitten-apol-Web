"use client";

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useCart } from "../../components/CartContext";
import Center from "../../components/Center";
import Header from "../../components/Header";
import CartIcon from "../../components/icons/CartIcon";
import ProductImages from "../../components/ProductImages";
import Title from "../../components/Title";
import WhiteBox from "../../components/WhiteBox";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { addProduct } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`http://localhost:3000/api/product/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}