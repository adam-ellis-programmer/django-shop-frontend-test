import React from 'react'

const MainSpinner = ({extraStyles}) => {
  return (
    <div className={`flex justify-center ${extraStyles}`}>
      <div className='grid'>
        <p className='text-5xl '>
          loading <span className='loading loading-dots loading-xl'></span>
        </p>
      </div>
    </div>
  )
}

export default MainSpinner
