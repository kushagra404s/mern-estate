import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {

  const[formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleChange = (e) => {
 setFormData(
  {
    ...formData,
    [e.target.id]: e.target.value
  }
 );
};

const handleSubmit = async (e) => {
  e.preventDefault();
 try {
   setLoading(true);
   const res=await fetch('/api/auth/signup',
     {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData),
     }
   );
   const data = await res.json();
 
   if(data.success === false) {
     setError(data.message);
     setLoading(false);
     return;
   }
   setLoading(false);
    setError(null);
   navigate('/signin');
   
 } catch (error) {
   setError(error.message);
   setLoading(false);
  
 }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className=' text-3xl text-center font-semibold my-6'>Sign Up</h1>

    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' on onChange={handleChange}></input>
      <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' on onChange={handleChange}></input>
      <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' on onChange={handleChange}></input>
      <button disabled={loading} className='bg-slate-700 text-white p-3 uppercase hover:opacity-95 disabled:opacity-80'> {loading? 'Loading..' : 'SignUp'} </button>
      <OAuth/>
    </form>

    <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to={"/signin"}>
        <span className='text-blue-700'>Signin</span>
        </Link>
    </div>
    {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}