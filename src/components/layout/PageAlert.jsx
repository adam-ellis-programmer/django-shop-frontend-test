import React, { useEffect, useRef, useState } from 'react'

const PageAlert = ({ msg, type = 'alert-info' }) => {
  const alertRef = useRef()
  useEffect(() => {
    alertRef.current.focus()
    return () => {}
  }, [])
  return (
    <div
      ref={alertRef}
      tabIndex={-1}
      role='alert'
      className={`alert ${type} absolute  z-10 top-1 w-full`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        className='h-6 w-6 shrink-0 stroke-current'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        ></path>
      </svg>
      <div className=' w-full flex justify-between items-center'>
        <span className='text-white text-[1.2rem]'>{msg}</span>
        <span className='cursor-pointer'>
          <i className='fa-solid fa-circle-xmark text-2xl text-red-500'></i>
        </span>
      </div>
    </div>
  )
}

export default PageAlert
