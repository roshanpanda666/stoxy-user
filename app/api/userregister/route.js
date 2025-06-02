import { connectionSRT } from "@/app/lib/d"
import { UserM } from "@/app/lib/model/user-schema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request){
    const payload=await request.json()
    await mongoose.connect(connectionSRT)

    try {
        const hashedPassword = await bcrypt.hash(payload.password, 10); // 10 is the salt rounds
        const userr = new UserM({
            username: payload.username, 
            email: payload.email,
            password: hashedPassword,
            product: payload.product, 
          });

          const result = await userr.save();
          return NextResponse.json({ result, success: true });

    } catch (err) {
        console.error("Error saving user:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}