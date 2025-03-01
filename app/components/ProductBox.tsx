import React from 'react';
import styled from "styled-components";

// Definir el tipo de las props para ProductBox
interface ProductBoxProps {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
}

const ProductWrapper = styled.div`

`


const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled.h3``;

const ProductBox: React.FC<ProductBoxProps> = ({ _id, title, description, price, images }) => {
    return (
        <ProductWrapper>
            <div>
                <WhiteBox>
                    <img src={images[0]} alt='Imagen del producto' />
                </WhiteBox>
            </div>
            {title}
        </ProductWrapper>
    );
};

export default ProductBox;
