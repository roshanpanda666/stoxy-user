"use client"
import React from 'react'
import { useRef } from 'react'

const Register = () => {
let username=useRef()
let emailref=useRef()
let pwdref=useRef()

const onsubmitfunction = ()=>{
  const uref=username.current.value
  const eref=emailref.current.value
  const pref=pwdref.current.value

  alert(eref)
  alert(pref)
  alert(uref)
}

function clearfun(){
  emailref.current.value=("")
  pwdref.current.value=("")
  username.current.value=("")
}
  return (
    <div>
      <div className='text-center items-center justify-center flex flex-col mt-40'>
        <div className='w-96 h-96 border-2 border-cyan-500'>

            <div className='mt-16'>
                
                <input ref={username} type="text" placeholder='user-name' className='bg-black text-cyan-300 border-2'/>
            </div>
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

export default Register
