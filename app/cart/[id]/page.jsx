// app/cart/[id]/page.jsx
import mongoose from "mongoose";
import { connectionSRT } from "@/app/lib/d";
import { User } from "@/app/lib/model/product-schema";
import Nav from "@/app/components/nav";
import Profilename from "@/app/components/profilename";
import AddToUserProduct from "@/app/components/addtocartbutton";

export default async function CartPage(props) {
  const { id } = await props.params; // ✅ This resolves the Next.js error

  await mongoose.connect(connectionSRT);
  const rawProduct = await User.findById(id);

  if (!rawProduct) {
    return <div className="p-4 text-red-500">Product not found.</div>;
  }

  const product = {
    brand: rawProduct.brand,
    price: rawProduct.price,
    quantity: rawProduct.quantity,
    id: rawProduct._id.toString(),
  };

  return (
    <div className="p-6 text-white">
      <Nav />
      <h1 className="text-2xl font-bold text-cyan-500 mb-4">Cart Page</h1>
      <div className="border border-cyan-400 p-4 rounded">
        <p><strong>Product:</strong> {product.brand}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>

        <Profilename product={product} />
        <AddToUserProduct product={product} />
      </div>
    </div>
  );
}
