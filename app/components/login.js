import React from 'react'

const Login = () => {
  return (
    <div>
      <div className='text-center items-center justify-center flex flex-col mt-40'>
        <div className='w-96 h-56 border-2 border-cyan-500'>
            <div className='mt-16'>
                
                <input type="text" placeholder='email' className='bg-black text-cyan-300 border-2'/>
            </div>
            <div className='mt-10'>
                <input type="text" placeholder='password' className='bg-black text-cyan-300 border-2'/>
            </div>
        </div>
            
      </div>
    </div>
  )
}

export default Login
