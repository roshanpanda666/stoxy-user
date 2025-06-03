"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const[product,setproduct]=useState("")

  useEffect(() => {
    fetch("/api/profilerote")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setemail(data.email);
          setname(data.username)
          setproduct(data.product)
        }
      });
  }, []);


  return (
  <>

    <div>
      <div>
      hello {name}
      </div>

      <div>
        email:{email}
      </div>

      <div>
        products : {product}
      </div>

      <button
          className="w-full bg-red-500 hover:bg-red-600 py-2 mt-6 rounded-lg text-white transition duration-200"
          onClick={() => signOut()}
        >
          Log Out
        </button>
    </div>
  </>
  )
}

export default page
