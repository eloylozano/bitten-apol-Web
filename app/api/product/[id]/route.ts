import { mongooseConnect } from '@/app/lib/mongoose';
import { Product } from '@/app/models/Product';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Importa NextRequest para definir el tipo de `req`

export async function GET(req: NextRequest, { params }: { params: { id: string } }) { // Define el tipo de `params`
  await mongooseConnect();
  const { id } = params;
  const product = await Product.findById(id);
  return NextResponse.json(product);
}
