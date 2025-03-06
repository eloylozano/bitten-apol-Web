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
import React from "react";
import { SyncLoader } from "react-spinners";
import NewProducts from "@/app/components/NewProducts";

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
  flex-direction: column;
  gap: 20px;
  align-items: end;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const { addProduct } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`http://localhost:3000/api/product/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    }

    async function fetchRecentProducts() {
      const response = await fetch('http://localhost:3000/api/products'); // Ajusta la URL según sea necesario
      const data: Product[] = await response.json();
      setRecentProducts(data.slice(0, 12)); // Solo toma los primeros 12 productos
    }

    fetchProduct();
    fetchRecentProducts();
  }, [id]);

  if (!product) {
    return <SyncLoader />;
  }

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <ProductInfo>
            <div>
              <Title>{product.title}</Title>
              <p>{product.description}</p>
            </div>
            <PriceRow>
              <div>
                <Price>{product.price} €</Price>
              </div>
              <div>
                <Button primary={true} onClick={() => addProduct(product._id)}>
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </ProductInfo>
        </ColWrapper>

        {/* Mostrar solo los primeros 12 productos recientes */}
        <NewProducts products={recentProducts} />
      </Center>
    </>
  );
}
