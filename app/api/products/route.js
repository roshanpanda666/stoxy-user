import { User } from "@/app/lib/model/product-schema";
import mongoose from "mongoose";
const { connectionSRT } = require("@/app/lib/d");
const { NextResponse } = require("next/server");


export async function GET(){

    await mongoose.connect(connectionSRT)
    const data = await User.find()
    console.log(data)
    return NextResponse.json({result:data,success:"true"})
}