import React, { useContext } from 'react';
import styled from "styled-components";
import Button from "./Button";
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
import { primary } from '../lib/colors';
import { CartContext } from './CartContext';

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


const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
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
`

const PriceRow = styled.div`  
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;   
`

const Price = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
    color: ${primary};
`

const ProductBox: React.FC<ProductBoxProps> = ({ _id, title, description, price, images }) => {
    const url = '/product/' + _id;

    const { addProduct } = useContext(CartContext);

    return (
        <ProductWrapper>
            <div>
                <WhiteBox href={url}>
                    <img src={images[0]} alt='Imagen del producto' />
                </WhiteBox>
            </div>
            <ProductInfoBox>
                <Title href='uri'>{title}</Title>
                <PriceRow>
                    <Price >{price} €</Price>
                    <Button 
                    grey={true} 
                    onClick={() => addProduct(_id)
                    } outline><CartIcon />Add to cart</Button>
                </PriceRow>

            </ProductInfoBox>
        </ProductWrapper>
    );
};

export default ProductBox;
