import { connectionSRT } from "@/app/lib/d"
import { UserM } from "@/app/lib/model/user-schema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request){
    const payload=await request.json()
    await mongoose.connect(connectionSRT)
    let user=new UserM(payload)
    const result=await user.save()
    return NextResponse.json({result,success:true})
}