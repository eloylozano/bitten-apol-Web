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

export default function CartPage() {
    const { cartProducts } = useCart();
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
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>
                                                <img src={product.images[0]} alt={product.title} style={{ width: '50px', height: '50px' }} />
                                            </td>
                                            <td>{product.title}</td>
                                            <td>
                                                {cartProducts.filter(id => id === product._id).length}
                                            </td>
                                            <td>${product.price}</td>
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