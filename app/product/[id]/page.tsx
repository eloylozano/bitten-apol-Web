"use client";

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useCart } from "../../components/CartContext";
import Center from "../../components/Center";
import Header from "../../components/Header";
import CartIcon from "../../components/icons/CartIcon";
import ProductImages from "../../components/ProductImages";
import Title from "../../components/Title";
import WhiteBox from "../../components/WhiteBox";
import styled from "styled-components";
import React from "react";
import { SyncLoader } from "react-spinners";
import NewProducts from "@/app/components/NewProducts";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation"; // Para redirigir

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: end;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const { addProduct } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isAdded, setIsAdded] = useState(false);  // Estado para el feedback de añadir al carrito
  const [user, setUser] = useState<any>(null); // Estado para el usuario autenticado
  const router = useRouter(); // Para redirigir

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`http://localhost:3000/api/product/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    }

    async function fetchRecentProducts() {
      const response = await fetch("http://localhost:3000/api/products");
      const data: Product[] = await response.json();
      setRecentProducts(data.slice(0, 12));
    }

    async function checkUserSession() {
      const response = await fetch("/api/auth/me"); // Ajusta la URL según sea necesario
      if (response.status === 200) {
        const data = await response.json();
        setUser(data); // Guarda el usuario si está autenticado
      }
    }

    fetchProduct();
    fetchRecentProducts();
    checkUserSession();
  }, [id]);

  const handleAddToCart = (productId: string) => {
    if (!user) { // Verifica si el usuario está autenticado
      router.push("/login"); // Redirige al login si no está autenticado
      return;
    }

    addProduct(productId);
    setIsAdded(true);  // Muestra el feedback visual
    setTimeout(() => setIsAdded(false), 2000);  // Restablece el feedback después de 2 segundos
  };

  if (!product) {
    return <SyncLoader />;
  }

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <ProductInfo>
            <div>
              <Title>{product.title}</Title>
              <p>{product.description}</p>
            </div>
            <PriceRow>
              <div>
                <Price>{product.price} €</Price>
              </div>
              <div>
                <Button
                  primary={true}
                  onClick={() => handleAddToCart(product._id)}
                  showToast={true} // Activa el pop-up
                  toastMessage="Se añadió el producto al carrito" // Mensaje personalizado
                >
                  <CartIcon />{" "}
                  {isAdded ? "Added to cart" : "Add to cart"}
                </Button>
              </div>
            </PriceRow>
          </ProductInfo>
        </ColWrapper>

        <NewProducts products={recentProducts} />
      </Center>
      <Footer />
    </>
  );
}
