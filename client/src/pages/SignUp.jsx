import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className=' text-3xl text-center font-semibold my-6'>Sign Up</h1>

    <form className='flex flex-col gap-4'>
      <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'></input>
      <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'></input>
      <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'></input>
      <button className='bg-slate-700 text-white p-3 uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
    </form>

    <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to={"/signin"}>
        <span className='text-blue-700'>Signin</span>
        </Link>
    </div>
    </div>
  )
}