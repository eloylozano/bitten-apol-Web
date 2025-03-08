// api/auth/update/route.ts
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  try {
    const { firstName, lastName } = await req.json();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userSession")?.value;

    if (!userId) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}