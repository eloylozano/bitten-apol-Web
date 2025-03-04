import { mongooseConnect } from "@/app/lib/mongoose";
import { Order } from "@/app/models/Order";
import { Product } from "@/app/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  // Definir tipos explícitos para los datos de la solicitud
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  }: {
    name: string;
    email: string;
    city: string;
    postalCode: string;
    streetAddress: string;
    country: string;
    cartProducts: string[]; 
  } = req.body;

  await mongooseConnect();
  
  const productsIds: string[] = cartProducts;
  const uniqueIds: string[] = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

  let line_items: any[] = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId).length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "EUR",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100, 
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
}
