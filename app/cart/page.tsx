"use client"
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Center from '../components/Center';
import Header from '../components/Header';
import Button from '../components/Button';
import { useCart } from '../components/CartContext';  // Usamos el hook `useCart`
import axios from 'axios';
import Table from '../components/Table';

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 15px 0;
`;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 0px;
    border: 1px solid rgb(0, 0, 0, .1);
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        max-width: 80px;
        max-height: 80px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    function moreOfThisProduct(id) {
        addProduct(id);
    }
    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {cartProducts?.length === 0 ? (
                            <div>Your cart is empty</div>
                        ) : products?.length === 0 ? (
                            <div>Loading products...</div>
                        ) : (
                            <Table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt={product.title} />
                                                </ProductImageBox>
                                            </ProductInfoCell>
                                            <td>{product.title}</td>
                                            <td>
                                                <Button onClick={() => lessOfThisProduct(product._id)}>
                                                    -
                                                </Button>

                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>

                                                <Button
                                                    onClick={() => moreOfThisProduct(product._id)}>
                                                    +
                                                </Button>
                                            </td>
                                            <td>
                                                {cartProducts.filter(id => id === product._id).length * product.price} €
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}

                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                            <input type="text" placeholder='Address' />
                            <input type="text" placeholder='Address 2' />
                            <Button grey block>Continue to payment</Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}