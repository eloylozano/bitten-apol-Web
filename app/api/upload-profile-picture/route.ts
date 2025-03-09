// app/api/upload-profile-picture/route.ts
import { NextResponse } from "next/server";
import aws from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

// Configura AWS S3
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Convierte el archivo a un buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const type = file.type.split("/")[1]; // Obtiene el tipo de imagen (jpg, png, etc.)

    // Parámetros para subir la imagen a S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Asegúrate de que esta variable esté definida
      Key: `profile-pictures/${uuidv4()}.${type}`, // Nombre único para la imagen
      Body: buffer,
      ContentType: file.type,
    };

    // Sube la imagen a S3
    const { Location } = await s3.upload(params).promise();

    // Devuelve la URL de la imagen subida
    return NextResponse.json({ url: Location }, { status: 200 });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
  }
}