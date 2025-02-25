"use client";

import styled from "styled-components";
import Center from "./Center";
import PrimaryBtn from "./Button";
import Button from "./Button";

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 0px;
  img {
    max-height: 100%;
    height: 300px;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ButtonsWrapper = styled.div`
  margin: 25px 0 0 0;
  display: flex;
  gap: 20px;
`;

export default function Featured({ product }) {
  console.log("Producto en Featured:", product);  // Esto ayudará a confirmar si product es válido

  if (!product) {
    return <p>Producto no encontrado</p>;  // Si no hay producto, muestra un mensaje
  }
  const { title } = product;

  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{title}</Title>
              <Desc>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto tempore deleniti autem dolor nemo quaerat facere.
                Ratione, itaque nam accusamus consectetur nulla recusandae fugit
                velit laboriosam dolores neque quae cupiditate.
              </Desc>
              <ButtonsWrapper>
                <Button outline white>
                  Read more
                </Button>
                <Button primary>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://bitten-apol.s3.amazonaws.com/1740512247774.png"
              alt="Main product"
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}

