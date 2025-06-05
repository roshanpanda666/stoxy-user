import { connectionSRT } from "@/app/lib/d";
import { User } from "@/app/lib/model/product-schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request,content){
    const filtered=content.params.putapi
    console.log(filtered);
    const data={_id:filtered}
    const payload=await request.json()
    console.log(payload);
    await mongoose.connect(connectionSRT)
    const result=await User.findOneAndUpdate(data,payload)
    return NextResponse.json({result,success:true})
}