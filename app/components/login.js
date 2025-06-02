"use client"
import React from 'react'
import { useRef } from 'react'
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const Login = () => {
const router=useRouter()
let emailref=useRef()
let pwdref=useRef()

const onsubmitfunction = async()=>{
  const email=emailref.current.value
  const password=pwdref.current.value

  alert(email)
  alert(password)

  try{
    const res=await signIn("credentials",{
        email,
        password,
        redirect:false,
    })
    if(res.error){
        setError("invalid credentials")
        alert("error")
        return
    }

    router.replace("/home")
}
catch(error){
    console.log("error");
}
}

function clearfun(){
  emailref.current.value=("")
  pwdref.current.value=("")
}
  return (
    <div>
      <div className='text-center items-center justify-center flex flex-col mt-40'>
        <div className='w-96 h-80 border-2 border-cyan-500'>
            <div className='mt-16'>
                
                <input ref={emailref} type="text" placeholder='email' className='bg-black text-cyan-300 border-2'/>
            </div>
            <div className='mt-10'>
                <input ref={pwdref} type="password" placeholder='password' className='bg-black text-cyan-300 border-2'/>
            </div>
            <div>
              <button className='text-center border-white  text-white border-2 mt-11 w-16'onClick={onsubmitfunction}>submit</button>
            </div>
            <div>
              <button className='text-center border-white  text-white border-2 mt-6 w-16'onClick={clearfun}>clear</button>
            </div>
        </div>
            
      </div>
    </div>
  )
}

export default Login
