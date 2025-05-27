import React from 'react'

const PriceSlider = () => {
  return (
    <div className='my-7 w-[70%] mx-auto '>
      <input
      
        type='range'
        min={0}
        max='100'
        // value='30'
        className='range range-xs'
      />
    </div>
  )
}

export default PriceSlider
