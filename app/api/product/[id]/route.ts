import { mongooseConnect } from '@/app/lib/mongoose';
import { Product } from '@/app/models/Product';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await mongooseConnect();
  const { id } = params;
  const product = await Product.findById(id);
  return NextResponse.json(product);
}