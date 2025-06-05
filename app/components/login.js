"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from 'next/link'

const Login = () => {
  const router = useRouter()
  const emailref = useRef()
  const pwdref = useRef()
  const [error, setError] = useState("")

  const onsubmitfunction = async () => {
    const email = emailref.current.value.trim()
    const password = pwdref.current.value.trim()

    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError("Invalid email or password")
        return
      }

      setError("")
      router.replace("/home") // change to your app's home/dashboard page
    } catch (error) {
      setError("Login failed. Try again.")
      console.error("Login error:", error)
    }
  }

  function clearfun() {
    emailref.current.value = ""
    pwdref.current.value = ""
    setError("")
  }

  return (
    <div>
      <div className='text-center items-center justify-center flex flex-col mt-40'>
        <div className='w-96 border-2 border-cyan-500 rounded-[30px]'>
          <div className='mt-10 text-xl font-semibold'>Login</div>
          <div className='mt-6'>
            <input
              ref={emailref}
              type="text"
              placeholder='email'
              className='bg-black text-cyan-300 border-2 w-full p-2'
            />
          </div>
          <div className='mt-10'>
            <input
              ref={pwdref}
              type="password"
              placeholder='password'
              className='bg-black text-cyan-300 border-2 w-full p-2'
            />
          </div>

          {error && (
            <div className="text-red-500 mt-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              className='text-center border-white text-white border-2 mt-11 w-full py-2 hover:border-green-400 hover:text-green-300'
              onClick={onsubmitfunction}
            >
              Submit
            </button>
          </div>

          <div>
            <button
              className='text-center border-white text-white border-2 mt-6 w-full py-2 hover:border-red-500 hover:text-red-400'
              onClick={clearfun}
            >
              Clear
            </button>
          </div>

          <div className='mt-6 mb-6'>
            Don't have an account?{" "}
            <Link href={'/registerform'}>
              <span className='text-blue-400 cursor-pointer underline'>Register here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
