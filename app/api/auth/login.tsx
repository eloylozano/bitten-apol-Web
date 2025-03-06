import bcrypt from "bcryptjs";
import cookie from "cookie";
import User from "../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/app/lib/mongoose";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      await mongooseConnect();

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

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

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
