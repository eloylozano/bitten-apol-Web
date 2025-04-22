"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Center from "../components/Center";
import Header from "../components/Header";
import { useCart } from "../components/CartContext"; // Usamos el hook `useCart`
import axios from "axios";
import Table from "../components/Table";
import Swal from "sweetalert2";
import StyledButton from "../components/StyledButton";

interface Product {
  _id: string;
  title: string;
  images: string[];
  price: number;
}

const RightColumnBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px; /* Añadimos más espacio entre los elementos */
  @media screen and (min-width: 768px) {
    padding: 30px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #252525; /* Añadir un borde sutil debajo del título */
    padding-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
  }
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  thead {
    background-color: #f5f5f5;
  }

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: 600;
    color: #333;
  }

  th:nth-child(1) {
    width: 50%;
  }

  th:nth-child(2) {
    width: 20%;
    text-align: center;
  }

  th:nth-child(3) {
    width: 30%;
    text-align: right;
  }

  td:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  td:nth-child(3) {
    text-align: right;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow-x: auto;

  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.8fr 1.2fr;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
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
`;

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

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
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
      title: "¡Compra realizada con éxito!",
      text: "Gracias por tu compra.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      setIsSuccess(true); // Cambia el estado para mostrar el mensaje de éxito
    });
  }

  function handleClearCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Cleared!", "Your cart has been cleared.", "success");
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
            <TitleBox>
              <h2>My Cart</h2>
              <StyledButton primary size="s" onClick={handleClearCart}>
                Clear Cart
              </StyledButton>
            </TitleBox>
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
                          <MoreLessButton
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </MoreLessButton>

                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>

                          <MoreLessButton
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </MoreLessButton>
                        </td>
                        <td>
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}{" "}
                          €
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <b>{total} €</b>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {!!cartProducts?.length && (
            <RightColumnBox>
              <h2>Order Information</h2>
              <ul>
                {products.map((product) => (
                  <li key={product._id}>
                    {product.title} x
                    {cartProducts.filter((id) => id === product._id).length}
                  </li>
                ))}
              </ul>
              <StyledButton primary size="l" onClick={handlePurchase}>
                Continue to payment
              </StyledButton>
            </RightColumnBox>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
