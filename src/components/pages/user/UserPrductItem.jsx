import React from 'react'
import { Link } from 'react-router-dom'
// import placeholder from '../../../place holders/place-holder.jpg'

const getBg = (i) => {
  if (i % 2 === 0) {
    return 'bg-gray-100 prod-list-dark'
  } else {
    return 'bg-stone-200 prod-list-dark-2'
  }
}

const getButtonClr = (i) => {
  if (i % 2 === 0) {
    return 'btn btn-primary md:btn-soft w-full '
  } else {
    return 'btn btn-primary md:btn-soft  w-full '
  }
}
const UserPrductItem = ({ product, i }) => {
  // console.log('-- id ---',product.id)

  return (
    <div>
      {/* make respnsive changes here  */}
      {/* prettier-ignore */}
      <div
        className={` p-10 mb-10 md:mb-1  md:p-3  grid md:grid-cols-5 items-center hover2  ${getBg(i)} `}
      >
        {/* image */}
        <div className='flex md:justify-center'>
          <img
            src={product?.images[0]?.image_url}
            alt={product.name}
            className='h-[80px] w-[80px] object-cover rounded-[35%]'
          />
        </div>
        {/* name */}
        <div className='md:text-center my-4 md:my-0 flex flex-col'>
          <span className='show-below-768 font-[700]'>name:</span>
          {product.name}
        </div>
        {/* button controlls */}
        <div className='flex md:justify-center gap-2 flex-col md:flex-row'>
          {/* takes us to a edit page  */}
          <span className='show-below-768 font-[700]'>buttons:</span>
          <Link to={`/edit-my-listing/${product.id}`} className=''>
            <button className={getButtonClr(i)}>
              Edit
            </button>
          </Link>
          {/* takes us to a delete page  */}
          <Link to={`/delete-product/${product.id}`}>
            <button className='btn md:btn-soft btn-secondary w-full'>
              Delete
            </button>
          </Link>
        </div>

        <div className='md:text-center my-5 md:my-0'>
          <span className='show-below-768 font-[700]'>Status:</span>
          {product.active ? (
            <div className='badge badge-secondary text-white'>Active</div>
          ) : (
            <div className='badge badge-info text-white'>Inactive</div>
          )}
        </div>
        {/* items sold */}
        <div className=' md:text-center '>
          <span className='show-below-768 font-[700]'>Items Sold:</span>
          <div className='badge badge-primary badge-lg'>3</div>
        </div>
      </div>
    </div>
  )
}

export default UserPrductItem
