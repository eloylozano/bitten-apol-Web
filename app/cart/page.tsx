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
import Swal from 'sweetalert2';

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
  const { cartProducts, addProduct, removeProduct, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    const validCartProducts = cartProducts.filter((id) => id != null); // Filtra null y undefined
    console.log("Valid Cart Products:", validCartProducts); // Verifica el array filtrado

    if (validCartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: validCartProducts })
        .then((response) => {
          console.log("API Response:", response.data); // Verifica la respuesta de la API
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setProducts([]); // Limpia los productos en caso de error
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id: any) {
    addProduct(id);
  }

  function lessOfThisProduct(id: any) {
    removeProduct(id); // Llama a removeProduct, que ahora elimina solo una instancia
  }

  function handlePurchase() {
    clearCart(); // Vacía el carrito

    // Muestra el pop-up de SweetAlert2
    Swal.fire({
      title: '¡Compra realizada con éxito!',
      text: 'Gracias por tu compra.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      setIsSuccess(true); // Cambia el estado para mostrar el mensaje de éxito
    });
  }

  function handleClearCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire(
          'Cleared!',
          'Your cart has been cleared.',
          'success'
        );
      }
    });
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
            ) : (
              <>
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
              </>
            )}

            <Button block="true" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <Button grey="true" block="true" onClick={handlePurchase}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
