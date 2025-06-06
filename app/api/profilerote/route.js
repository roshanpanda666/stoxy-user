import { connectionSRT } from "@/app/lib/d";
import { UserM } from "@/app/lib/model/user-schema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route"; // Adjust path if needed

export async function GET() {
  try {
    const session = await getServerSession(authOption);

    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await mongoose.connect(connectionSRT);

    const user = await UserM.findOne({ email: session.user.email }).lean();

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      username: user.username,
      email: user.email,
      products: user.products,
      buying:user.buying
    });
  } catch (err) {
    console.error("Error in /api/profilerote:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
