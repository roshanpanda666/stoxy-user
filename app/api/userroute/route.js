import { UserM } from "@/app/lib/model/user-schema";
import mongoose from "mongoose";
const { connectionSRT } = require("@/app/lib/d");
const { NextResponse } = require("next/server");


export async function GET(){

    await mongoose.connect(connectionSRT)
    const data = await UserM.find()
    console.log(data)
    return NextResponse.json({result:data,success:"true"})
}