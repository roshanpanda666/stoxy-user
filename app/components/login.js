"use client"
import React from 'react'
import { useRef } from 'react'
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from 'next/link'

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
        <div className='w-96 border-2 border-cyan-500 rounded-[30px]'>
          <div className='mt-10'>Login</div>
            <div className='mt-6'>
                
                <input ref={emailref} type="text" placeholder='email' className='bg-black text-cyan-300 border-2'/>
            </div>
            <div className='mt-10'>
                <input ref={pwdref} type="password" placeholder='password' className='bg-black text-cyan-300 border-2'/>
            </div>
            <div>
              <button className='text-center border-white  text-white border-2 mt-11 w-16 hover:border-green-400 hover:text-green-300'onClick={onsubmitfunction}>submit</button>
            </div>
            <div>
              <button className='text-center border-white  text-white border-2 mt-6 w-16 hover:border-red-500 hover:text-red-400'onClick={clearfun}>clear</button>
            </div>
            <div className='mt-6 mb-6'>don't have an account ? <Link href={'registerform'}><span className='text-blue-400 cursor-pointer'>Register here</span></Link> </div>

        </div>
            
      </div>
    </div>
  )
}

export default Login
