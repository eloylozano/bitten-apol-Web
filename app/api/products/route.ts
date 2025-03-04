import { mongooseConnect } from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";
import { NextResponse } from "next/server";


export async function GET() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return NextResponse.json(products);
}
