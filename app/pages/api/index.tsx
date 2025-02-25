import Center from "@/app/components/Center";
import Featured from "@/app/components/Featured";
import Header from "@/app/components/Header";
import { mongooseConnect } from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";
import React from "react";
import { useEffect } from "react"; // Asegúrate de impor

export default function HomePage({ product }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}

export async function getServerSideProps() {
    const featuredProductId = '640de2b12aa291ebdf213d48';
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      },
    };
  }