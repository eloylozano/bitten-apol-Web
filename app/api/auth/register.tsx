import bcrypt from "bcryptjs";
import cookie from "cookie";
import User from "../../models/User";
import { mongooseConnect } from "@/app/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      await mongooseConnect();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await user.save();

      // Crear cookie de sesión
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("userSession", user._id.toString(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Solo en producción
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 1 semana
          path: "/",
        })
      );

      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}