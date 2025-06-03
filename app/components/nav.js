import React from "react";
import Link from "next/link";

const Nav = () => {
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
