"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { useSession, signOut } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const[buying,setbuying]=useState("")



  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profilerote")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setEmail(data.email);
            setName(data.username);
            setProducts(data.products || []);
            setbuying(data.buying)
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [status]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/loginform" });
  };

  const buy_now=async()=>{
    await fetch("/api/buyingput", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ buying: "order initiated" }), // or "false"
    });
    
  }


  if (status === "loading") {
    return <div className="p-4 text-gray-600">Loading...</div>;
  }

  return (
    <div>
      <Nav />

      <div className="max-w-2xl mx-auto mt-10 p-6 border-2 border-cyan-400 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>

        <p>
          <strong>Username:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>

        <div className="mt-4">
          <strong>Products:</strong>
          {products.length > 0 ? (
            <ul className="list-disc pl-6 mt-2">
              {products.map((product, idx) => (
                <li key={idx} className="mb-2">
                  <span className="font-semibold">Brand:</span> {product.brand} |{" "}
                  <span className="font-semibold">Price:</span> ₹{product.price} |{" "}
                  <span className="font-semibold">Quantity:</span> {product.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2">No products found.</p>
          )}
        </div>
        <div>order status: <span className="text-cyan-300">{buying}</span></div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-black hover:bg-red-600 text-white py-2 rounded-lg transition duration-500 hover:text-white border-cyan-300 border-2"
        >
          log out
        </button>
      </div>
    </div>
  );
};

export default Page;
