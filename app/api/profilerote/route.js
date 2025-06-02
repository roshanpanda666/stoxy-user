import { connectionSRT } from "@/app/lib/d";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { UserM } from "@/app/lib/model/user-schema";

export async function GET(){
    try {
        await mongoose.connect(connectionSRT)
        const session= await getServerSession(authOption)
        if(!session || !session.user?.email){
            return NextResponse.json({success: false,message:"not authenticated"})
        }

        const email=session.user.email
        const user=await UserM.findOne({email})
        

        if(!user){
            return NextResponse.json({success:false,message:"user not found"})
        }

        console.log(email);

        return NextResponse.json({
            success: true,
            email: user.email || [],// default to empty array if undefined
            username:user.username || [],
            product:user.product || [],
          });
    } catch (error) {
        console.error("fetch user comment error:",error)
        return NextResponse.json({ success: false, message: "Server error" });
    }
}