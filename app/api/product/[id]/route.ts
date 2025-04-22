import { mongooseConnect } from '@/app/lib/mongoose';
import { Product } from '@/app/models/Product';
import { NextResponse } from 'next/server';

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await mongooseConnect();
    const product = await Product.findById(params.id);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}