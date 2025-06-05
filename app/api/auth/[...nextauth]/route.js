import { connectionSRT } from "@/app/lib/d";
import { UserM } from "@/app/lib/model/user-schema";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      // Correct this key name
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("Auth attempt with:", email);
      
        try {
          await mongoose.connect(connectionSRT);
      
          const user = await UserM.findOne({ email }).lean();
          console.log("Found user:", user);
      
          if (!user) {
            console.log("User not found");
            return null;
          }
      
          if (!user.password) {
            console.log("User has no password");
            return null;
          }
      
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log("Password match?", passwordMatch);
      
          if (!passwordMatch) {
            console.log("Password incorrect");
            return null;
          }
      
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
          };
        } catch (error) {
          console.log("Authorize error:", error);
          return null;
        }
      }
      
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = nextAuth(authOption);

export { handler as GET, handler as POST };
