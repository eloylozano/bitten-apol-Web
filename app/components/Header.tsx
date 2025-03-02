"use client";

import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useCart } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.3em;
  font-weight: semi-bold;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

export default function Header() {
  let cartProducts = [];

  try {
    const cartContext = useCart();
    cartProducts = cartContext.cartProducts;
  } catch (error) {
    console.error("CartContext no está disponible en Header");
  }

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>BITTEN APOL</Logo>
          <StyledNav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
