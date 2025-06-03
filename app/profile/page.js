"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Nav from "../components/nav";
const Page = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    fetch("/api/profilerote")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEmail(data.email);
          setName(data.username);
          setProduct(data.product);
        }
      });
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/loginform" }); // redirect after logout
  };

  if (status === "loading") {
    return <div className="p-4 text-gray-600">Loading...</div>;
  }

  return (
    <>
    <Nav></Nav>
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg border-2 border-cyan-300">
      <h1 className="text-2xl font-bold mb-4">Welcome, {name || "User"} 👋</h1>
      
      <div className="mb-2">
        <strong>Email:</strong> {email}
      </div>

      <div className="mb-2">
        <strong>Products:</strong> {product || "None"}
      </div>

      <button
        className="w-full bg-red-500 hover:bg-red-600 py-2 mt-6 rounded-lg text-white transition duration-200"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
    </>

  );
};

export default Page;
