import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartContextProvider } from "./components/CartContext"; // 🔹 Importa el proveedor

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitten Apol",
  description: "Ecommerce made by Eloy Lozano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartContextProvider> {/* 🔹 Envuelve toda la app */}
          {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
