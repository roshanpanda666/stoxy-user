'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Profilename from "./profilename";
const Nav = () => {
    const[name,setname]=useState("...")
    const { data: session} = useSession();
    useEffect(()=>{
        if(session?.user)
        fetch("/api/profilerote")
        .then((res)=> res.json())
        .then ((data)=>{
            if (data.success){
                setname(data.username)
            }
        })
    },[session])

  return (
    <nav className=" shadow-md py-6 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Branding */}
        <Link href="/home">
          <span className="text-xl font-bold text-white cursor-pointer flex gap-3">
          <span><img
                src="/favicon.ico" // replace with real user avatar if available
                alt="profile icon"
                className="w-6 h-6 rounded-full"
              /></span>
            Stoxy-User
            
          </span>
        </Link>

        {/* Right - Navigation Links */}
        <div className="flex items-center space-x-6">
            <div>
                hello <span className="text-cyan-300">{name}</span>
            </div>
          <Link href="/orders">
            <span className="text-white hover:text-cyan-400 transition cursor-pointer">
              My Orders
            </span>
          </Link>

          <Link href="/profile">
            <div className="flex items-center gap-2 cursor-pointer">
              
              <span className="text-white hover:text-cyan-400 transition">
                Profile
              </span>

            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
