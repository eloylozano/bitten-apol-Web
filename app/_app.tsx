import { AppProps } from "next/app"; // Si usas Next.js
import { CartContextProvider } from "./components/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import { AuthContextProvider } from "./components/AuthContext";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body {
    background-color: red;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bitten Apol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <CartContextProvider>
        <AuthContextProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <Component {...pageProps} />
        </AuthContextProvider>
      </CartContextProvider>
    </>
  );
}
