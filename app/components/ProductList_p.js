"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const getProducts = async () => {
  try {
    let response = await fetch("/api/products", { cache: "no-cache" });
    let data = await response.json();
    return data.success ? data.result : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductList_p = () => {
  const [productlist, setProductList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts();
      setProductList(products);
    };

    loadProducts();
    const interval = setInterval(loadProducts, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (id) => {
    router.push(`/cart/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center text-2xl text-cyan-500 font-semibold mb-4">
        Products Available
      </div>

      {/* Header row */}
      <div className="flex text-center font-medium border-b-2 border-cyan-400 pb-2">
        <div className="w-1/4">Product</div>
        <div className="w-1/4">Price</div>
        <div className="w-1/4">Quantity</div>
        <div className="w-1/4">Action</div>
      </div>

      {/* Product rows */}
      {Array.isArray(productlist) && productlist.length > 0 ? (
        productlist.map((item, index) => (
          <div
            key={index}
            className="flex text-center py-2 border-b border-gray-300 items-center"
          >
            <div className="w-1/4 text-white">{item.brand}</div>
            <div className="w-1/4 text-cyan-600">{item.price}</div>
            <div className="w-1/4">{item.quantity}</div>
            <div className="w-1/4">
              <button
                onClick={() => handleAddToCart(item._id)}
                className="text-white bg-black border-l-2 border-r-2 border-cyan-300 hover:border-2 px-2 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">No products available</div>
      )}
    </div>
  );
};

export default ProductList_p;
