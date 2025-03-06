import { mongooseConnect } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cookies = cookie.parse(req.headers.cookie || "");
      const userId = cookies.userSession;

      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      await mongooseConnect();
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
