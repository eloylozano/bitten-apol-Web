import { mongooseConnect } from "@/app/lib/mongoose";
import { Order } from "@/app/models/Order";
import { Product } from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = body;

    await mongooseConnect();

    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

    let line_items = [];

    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(
        (p) => p._id.toString() === productId
      );
      const quantity = productsIds.filter((id) => id === productId).length || 0;

      if (quantity > 0 && productInfo) {
        line_items.push({
          product: productInfo._id,
          quantity,
          price: productInfo.price,
          title: productInfo.title,
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

    return NextResponse.json({ 
      success: true,
      orderId: orderDoc._id.toString()
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error processing order' },
      { status: 500 }
    );
  }
}