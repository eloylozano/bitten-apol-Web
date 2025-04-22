import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartContextProvider } from "./components/CartContext";
import { AuthContextProvider } from "./components/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledComponentsRegistry from "./lib/registry"; // 👈 Nuevo

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bitten Apol",
  description: "Ecommerce made by Eloy Lozano",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StyledComponentsRegistry> 
          <CartContextProvider>
            <AuthContextProvider>
              <ToastContainer position="top-right" autoClose={3000} />
              {children}
            </AuthContextProvider>
          </CartContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}