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
  gap: 20px;
  padding-top: 20px;
`;

const NewProducts: React.FC<NewProductsProps> = ({ products }) => {
  return (
    <Center>
      <ProductsGrid>
        {products?.length > 0 && products.map(product => (
          <ProductBox {...product} />
        ))}
      </ProductsGrid>
    </Center>
  );
}

export default NewProducts;
