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
import { useAuth } from "@/app/components/AuthContext";

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
  const [isAdded, setIsAdded] = useState(false);
  const { isAuthenticated, login, logout } = useAuth(); // Usa el contexto de autenticación
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/api/product/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    }

    async function fetchRecentProducts() {
      const response = await fetch("/api/products");
      const data: Product[] = await response.json();
      setRecentProducts(data.slice(0, 12));
    }

    fetchProduct();
    fetchRecentProducts();
  }, [id]);

  const handleAddToCart = (productId: string) => {
    if (!isAuthenticated) { // Verifica si el usuario está autenticado usando el contexto
      router.push("/login"); // Redirige al login si no está autenticado
      return;
    }

    addProduct(productId);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
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
                  showToast={true}
                  toastMessage="Se añadió el producto al carrito"
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
