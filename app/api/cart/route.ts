import { mongooseConnect } from '@/app/lib/mongoose';
import { Product } from '@/app/models/Product';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await mongooseConnect();
    const { ids } = await request.json();
    const products = await Product.find({ _id: { $in: ids } });
    return NextResponse.json(products);
}