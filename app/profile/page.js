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
    </div>
  )
}

export default page
