import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log('Received data:', body); // Verifica que se recibe correctamente

    if (!email || !password) {
      console.log('Missing fields'); // Verifica si faltan campos
      return new Response(JSON.stringify({ message: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await mongooseConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists'); // Verifica si el usuario ya existe
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      serialize("userSession", user._id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );

    return new Response(JSON.stringify({ message: "User registered successfully", user }), {
      status: 201,
      headers,
    });
  } catch (error) {
    console.error('Error in registration:', error); // Captura el error
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
