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
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { buying } = body;

    if (typeof buying !== "string") {
      return NextResponse.json({ success: false, message: "Invalid buying value" }, { status: 400 });
    }

    // Find and update user
    const updatedUser = await UserM.findOneAndUpdate(
      { email: session.user.email },
      { $set: { buying } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Buying status updated", buying: updatedUser.buying });
  } catch (err) {
    console.error("Error updating buying:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
