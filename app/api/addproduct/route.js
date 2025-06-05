import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { connectionSRT } from "@/app/lib/d";
import { UserM } from "@/app/lib/model/user-schema";

export async function PUT(req) {
  try {
    // Connect to MongoDB
    await mongoose.connect(connectionSRT);

    // Get session
    const session = await getServerSession(authOption);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    // Get body
    const body = await req.json();
    const { brand, price, quantity } = body;

    if (!brand || !price || !quantity) {
      return NextResponse.json({ success: false, message: "Incomplete data" });
    }

    // Find user
    const user = await UserM.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // Ensure products array exists
    if (!user.products) {
      user.products = [];
    }

    // Push product
    user.products.push({ brand, price, quantity });

    // Save user
    await user.save();

    return NextResponse.json({ success: true, message: "Product added" });
  } catch (err) {
    console.error("Add product error:", err);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
