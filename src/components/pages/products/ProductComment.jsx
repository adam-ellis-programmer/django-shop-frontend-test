import React from 'react'

// prettier-ignore
const ProductComment = (comment) => {

  const ratingArray = Array.from({length: comment.comment.rating}, (_,i) => i +1)
// console.log(comment.comment)

  return (
    <li className=' p-4 shadow-[1px_1px_5px_#ccc] mt-5'>
        <div>
             {ratingArray?.map((rating) =>{
              return <i key={rating} className="fa-regular fa-star text-2xl text-[#D9420B]"></i>
            })}
        
        </div>
      <div className='my-2'>
        {comment?.comment?.username}
      </div>
      <div>
       {comment?.comment?.text}
      </div>
    </li>
  )
}

export default ProductComment
