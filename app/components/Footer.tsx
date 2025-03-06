"use client"

import React from "react";
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// Contenedor principal del footer
const FooterContainer = styled.footer`
  margin-top: 75px;
  background-color: #333;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Enlace de redes sociales
const SocialIcons = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 20px;

  a {
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;

    &:hover {
      color: #00aaff;
    }
  }
`;

// Enlaces de navegación en el footer
const FooterLinks = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  gap: 30px;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      color: #00aaff;
    }
  }
`;

const CopyContainer = styled.div`
  background-color: #252525;
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Copyright = styled.p`
  padding: 10px 0;
  font-size: 0.9rem;
  color: #ccc;
`;



const Footer = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </SocialIcons>

      <FooterLinks>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </FooterLinks>
      <CopyContainer>
        <Copyright>
          &copy; {new Date().getFullYear()} Bitten Apol. All rights reserved.
        </Copyright>
      </CopyContainer>
    </FooterContainer>
  );
};

export default Footer;
