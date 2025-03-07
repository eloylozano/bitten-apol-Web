"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Center from "../components/Center";
import Header from "../components/Header";
import Button from "../components/Button";
import { useCart } from "../components/CartContext"; // Usamos el hook `useCart`
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";
import Footer from "../components/Footer";

interface Product {
  _id: string;
  title: string;
  images: string[];
  price: number;
}
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Por defecto, una sola columna */
  gap: 20px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr; /* 2 columnas para pantallas medianas */
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1.5fr 1fr; /* Para pantallas grandes */
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  @media screen and (min-width: 768px) {
    padding: 30px;
  }
`;

const ProductInfoCell = styled.td`
  padding: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductImageBox = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid rgb(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  flex-wrap: wrap; /* Esto asegura que los inputs se ajusten cuando el espacio es pequeño */
  gap: 5px;
  @media screen and (min-width: 768px) {
    gap: 10px;
  }
`;

const MoreLessButton = styled.button`
  width: 20px;
  background-color: #252525;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #252525;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #4a4949;
  }
  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
  
    useEffect(() => {
      if (cartProducts.length > 0) {
        axios
          .post("/api/cart", { ids: cartProducts })
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      } else {
        setProducts([]);
      }
    }, [cartProducts]);
  
    function moreOfThisProduct(id: any) {
      addProduct(id);
    }
  
    function lessOfThisProduct(id: any) {
      removeProduct(id);
    }
  
    async function goToPayment() {
      const response = await axios.post("/api/checkout", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      if (response.data.url) {
        window.location = response.data.url;
      }
    }
  
    let total = 0;
    for (const productId of cartProducts) {
      const price = products.find((p) => p._id === productId)?.price || 0;
      total += price;
    }
  
    if (isSuccess) {
      return (
        <>
          <Header />
          <Center>
            <ColumnsWrapper>
              <Box>
                <h1>Thanks for your order!</h1>
                <p>We will email you when your order will be sent.</p>
              </Box>
            </ColumnsWrapper>
          </Center>
        </>
      );
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
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt={product.title} />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <MoreLessButton onClick={() => lessOfThisProduct(product._id)}>
                            -
                          </MoreLessButton>
  
                          <QuantityLabel>
                            {cartProducts.filter((id) => id === product._id).length}
                          </QuantityLabel>
  
                          <MoreLessButton onClick={() => moreOfThisProduct(product._id)}>
                            +
                          </MoreLessButton>
                        </td>
                        <td>
                          {cartProducts.filter((id) => id === product._id).length * product.price} €
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>{total} €</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!!cartProducts?.length && (
              <Box>
                <h2>Order Information</h2>
                <form action="/api/checkout" method="post">
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setName(ev.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(ev.target.value)
                    }
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                        setCity(ev.target.value)
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                        setPostalCode(ev.target.value)
                      }
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setStreetAddress(ev.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setCountry(ev.target.value)
                    }
                  />
                  <Button grey="true" block="true" onClick={goToPayment}>
                  Continue to payment
                </Button>
                </form>
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </>
    );
  }