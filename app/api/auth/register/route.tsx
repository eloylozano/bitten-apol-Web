import bcrypt from "bcryptjs";
import { cookies } from "next/headers"; // Para manejar cookies en App Router
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await mongooseConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    // Crear cookie de sesión
    (await
          // Crear cookie de sesión
          cookies()).set({
      name: "userSession",
      value: user._id.toString(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    });

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
