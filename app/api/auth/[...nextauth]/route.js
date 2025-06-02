import { connectionSRT } from "@/app/lib/d";
import { UserM } from "@/app/lib/model/user-schema";
import nextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const authOption={
    providers:[
        CredentialsProvider({
            name:"credentials",
            Credential:{},

            async authorize(credentials){
                const {email,password}=credentials

                try{
                    mongoose.connect(connectionSRT)
                    const user=await UserM.findOne({email})

                    if(!user){
                        return null 
                    }

                    const passwordMatch=await bcrypt.compare(password,user.password)
                    if(!passwordMatch){
                        return null

                    }
                    return user
                }catch(error){
                    console.log("error:",error);
                }  
            },

        }),
    ],

    sessiion:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/loginform"
    }
}

const handler = nextAuth(authOption)

export {handler as GET,handler as POST}