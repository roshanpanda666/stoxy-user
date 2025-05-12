import mongoose from "mongoose";

const UserModel= new mongoose.Schema({
    
    email: { type: String, required: true },
    username: { type: String, required: true },
    product: { type: String, required: false }, 
    password: { type: String, required: false }, 

    

})
export const UserM = mongoose.models.stockss || mongoose.model("stockss", UserModel); 