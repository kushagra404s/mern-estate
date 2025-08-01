import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        
        <div className='p-7 border-b-2 m:border-r-2 md:min-h-screen'>
       <form className='flex flex-col gap-8'>
        <div className="flex items-center gap-2" >
            <label className='whitespace-nowrap'> search Term:</label>
            <input type="text"
            id='searchTerm'
            placeholder='search..'
            className=' border rounded-lg p-3 w-full m-1'
            ></input>
        </div>

        <div className='flex gap-2 flex-wrap items-center'>
             <label>Types:</label>

             <div className='flex gap-2'>
              <input type="checkbox" id="all" 
              className='w-5'
              />
              <span> Rent & Sell</span>
             </div>

             <div className='flex gap-2'>
              <input type="checkbox" id="rent" 
              className='w-5'
              />
              <span> Rent </span>
             </div>

             <div className='flex gap-2'>
              <input type="checkbox" id="sale" 
              className='w-5'
              />
              <span> Sell</span>
             </div>

             <div className='flex gap-2'>
              <input type="checkbox" id="offer" 
              className='w-5'
              />
              <span>Offer</span>
             </div>
        </div>

        <div className='flex gap-2 flex-wrap items-center'>
             <label>Amenities:</label>

             <div className='flex gap-2'>
              <input type="checkbox" id="parking" 
              className='w-5'
              />
              <span> Parking</span>
             </div>

             <div className='flex gap-2'>
              <input type="checkbox" id="furnished" 
              className='w-5'
              />
              <span> Furnished </span>
             </div>
        </div>

         <div classname= "flex items-center gap-2 ">
          <lable>Sort:</lable>
          <select className='border rounded-md p-1 m-1' id="sort_order">
            <option>Price high to low</option>
            <option>Price low to high</option>
            <option>Oldest</option>
            <option>Latest</option>
          </select>
         </div>
             <button className="bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-90"> Search</button>
       </form>
        </div>


        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Result</h1>
        </div>

    </div>
  )
}
