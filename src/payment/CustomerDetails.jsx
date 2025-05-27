import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerDetails = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <div className=' lg:w-3/4 m-auto'>
      <div className='mb-2 flex gap-5'>
        <input
          type='text'
          placeholder='First Name'
          className='input input-lg w-1/2'
        />
        <input
          type='text'
          placeholder='Last Name'
          className='input input-lg w-1/2'
        />
      </div>
      <div className='mb-2'>
        <textarea
          placeholder='Address'
          className='textarea textarea-md w-full'
        ></textarea>
      </div>
      <div className='mb-2'>
        <input
          type='text'
          placeholder='Phone Number'
          className='input input-lg w-full'
        />
      </div>
      <div className=' max-w-[560px] m-auto flex justify-end'>
        <button onClick={goBack} className='btn  btn-dash btn-secondary'>
          <i class='fa-solid fa-hand-point-left'></i> back to cart
        </button>
      </div>
    </div>
  )
}

export default CustomerDetails
