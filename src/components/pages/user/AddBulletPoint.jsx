import React, { useState } from 'react'

// console.log(inputs)
const AddBulletPoint = () => {
  const [inputLength, setInputLength] = useState(4)
  const inputs = Array.from({ length: inputLength }, (_, i) => {
    // console.log(i)

    return { index: i + 1 }
  })

  const handleAddInput = () => {
    setInputLength((prev) => prev + 1)
  }

  return (
    <div className='flex flex-col'>
      {inputs.map((item, i) => {
        return (
          <div key={item.index} className='flex items-center'>
            <div className='badge badge-primary badge-sm mr-3'>{i + 1}</div>
            <input
              type='text'
              placeholder='bullet point one'
              className='input input-secondary w-full my-1'
              name={`bullet_${item.index}`}
              id={`bullet-${item.index}`}
            />
          </div>
        )
      })}
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={handleAddInput}
          className='btn btn-outline btn-secondary'
        >
          Add field <i className='fa-solid fa-square-plus'></i>
        </button>
      </div>
    </div>
  )
}

export default AddBulletPoint
