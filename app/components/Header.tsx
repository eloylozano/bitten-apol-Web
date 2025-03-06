"use client";

import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useCart } from "./CartContext";

// Estilos del Header
const StyledHeader = styled.header`
  background-color: #222;
  padding: 10px 0;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.3em;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavLink = styled(Link)`
  color: #aaa;
  padding-left: 20px;
  text-decoration: none;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
  @media (max-width: 768px) {
    display: none; /* Ocultar la navegación por defecto en móviles */
    flex-direction: column;
    gap: 10px;
    width: 100%;
    background-color: #222;
    padding: 10px 0;
    position: absolute;
    top: 60px;
    left: 0;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  display: none;
  @media (max-width: 768px) {
    display: block; /* Mostrar el botón en móviles */
  }
`;

const CartCount = styled.span`
  background-color: red;
  border-radius: 50%;
  color: white;
  padding: 0.2em 0.5em;
  font-size: 0.9em;
  position: relative;
  top: -5px;
  left: -5px;
`;

export default function Header() {
  let cartProducts = [];

  try {
    const cartContext = useCart();
    cartProducts = cartContext.cartProducts;
  } catch (error) {
    console.error("CartContext no está disponible en Header");
  }

  const toggleMenu = () => {
    const nav = document.getElementById("nav");
    if (nav) {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    }
  };

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Bitten Apol</Logo>
          <MobileMenuButton onClick={toggleMenu}>☰</MobileMenuButton>
          <StyledNav id="nav">
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>
              Cart <CartCount>{cartProducts.length}</CartCount>
            </NavLink>

            <NavLink href="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
            </NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
