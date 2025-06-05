// app/cart/[id]/page.jsx
import mongoose from "mongoose";
import { connectionSRT } from "@/app/lib/d";
import { User } from "@/app/lib/model/product-schema";
import Nav from "@/app/components/nav";

export default async function CartPage({ params }) {
  const { id } = params;

  await mongoose.connect(connectionSRT);
  const product = await User.findById(id);

  if (!product) {
    return <div className="p-4 text-red-500">Product not found.</div>;
  }

  return (
    <div className="p-6 text-white">
      <Nav></Nav>
      <h1 className="text-2xl font-bold text-cyan-500 mb-4">Cart Page</h1>
      <div className="border border-cyan-400 p-4 rounded">
        <p><strong>Product:</strong> {product.brand}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
      </div>
    </div>
  );
}
