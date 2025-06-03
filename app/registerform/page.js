"use client"

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'  // ✅ Import router for App Router

const Register = () => {
  const usernameref = useRef()
  const emailref = useRef()
  const pwdref = useRef()
  const router = useRouter()

  const onsubmitfunction = async () => {
    const username = usernameref.current.value
    const email = emailref.current.value
    const password = pwdref.current.value
    const product = "initial-value"
    try {
      const res = await fetch("/api/userregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password, product })
      })

      if (res.ok) {
        alert("Data pushed successfully")
        clearfun()
        router.push('/')  // ✅ Navigate to loginform
      } else {
        alert("Error pushing data")
      }
    } catch (error) {
      alert("Data not pushed successfully")
    }
  }

  function clearfun() {
    emailref.current.value = ""
    pwdref.current.value = ""
    usernameref.current.value = ""
  }

  return (
    <div>
      <div className='text-center items-center justify-center flex flex-col mt-40'>
        <div className='w-96 h-96 border-2 border-cyan-500 rounded-[30px]'>

          <div className='mt-10'>
            Register yourself
          </div>

          <div className='mt-6'>
            <input ref={usernameref} type="text" placeholder='user-name' className='bg-black text-cyan-300 border-2' />
          </div>
          <div className='mt-10'>
            <input ref={emailref} type="text" placeholder='email' className='bg-black text-cyan-300 border-2' />
          </div>
          <div className='mt-10'>
            <input ref={pwdref} type="password" placeholder='password' className='bg-black text-cyan-300 border-2' />
          </div>
          <div>
            <button className='text-center border-white  text-white border-2 mt-11 w-16 hover:border-green-400 hover:text-green-300' onClick={onsubmitfunction}>submit</button>
          </div>
          <div>
            <button className='text-center border-white  text-white border-2 mt-6 w-16 hover:border-red-400 hover:text-red-300' onClick={clearfun}>clear</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
