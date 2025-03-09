// api/auth/update/route.ts
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { firstName, lastName, phone, profilePicture } = await req.json();

    // Obtén el ID del usuario desde las cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get("userSession")?.value;

    if (!userId) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Actualiza el usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phone, profilePicture }, // Incluye phone y profilePicture
      { new: true } // Devuelve el usuario actualizado
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Devuelve el usuario actualizado
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}