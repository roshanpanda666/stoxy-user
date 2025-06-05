'use client'
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const Profilename = () => {
    const[name,setname]=useState("...")
    const[emaill,setemail]=useState("...")
    const { data: session} = useSession();
    useEffect(()=>{
        if(session?.user)
        fetch("/api/profilerote")
        .then((res)=> res.json())
        .then ((data)=>{
            if (data.success){
                setname(data.username)
                setemail(data.email)
            }
        })
    },[session])

  return (
    <div className=" shadow-md py-6 px-6">
      

            <div>
                logged in as: <span className="text-cyan-300">{name}</span>
            </div>
            <div>
                email: <span className="text-cyan-300">{emaill}</span>
            </div>
         
    </div>
  );
};

export default Profilename;