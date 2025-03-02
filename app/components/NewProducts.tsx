"use client";

import React from 'react';
import styled from "styled-components";
import Center from './Center';
import ProductBox from './ProductBox';

// Definir un tipo para la prop de productos
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
}

interface NewProductsProps {
  products: Product[];
}

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 30px;
`;

const NewProducts: React.FC<NewProductsProps> = ({ products }) => {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox images={[]} key={product._id} {...product} />
          ))}
      </ProductsGrid>
    </Center>
  );
};


export default NewProducts;
