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
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas por defecto */
  gap: 30px;
  padding-top: 30px;

  /* Responsividad para pantallas medianas (tabletas) */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas para pantallas medianas */
  }

  /* Responsividad para pantallas pequeñas (móviles) */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas para móviles */
  }

  /* Responsividad para pantallas extra pequeñas (móviles más pequeños) */
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 columna para pantallas más pequeñas */
  }
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
