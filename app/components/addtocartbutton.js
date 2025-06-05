"use client";
import React from "react";

export default function AddToUserProduct({ product }) {
  const handleAdd = async () => {
    try {
      const res = await fetch("/api/addproduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Product added to your profile!");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Add product error:", err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <button
      onClick={handleAdd}
      className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
    >
      Add Product to My Account
    </button>
  );
}
