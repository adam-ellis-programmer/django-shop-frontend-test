import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'

const SearchPageCard = ({ product }) => {
  const { images } = product

  return (
    <div className='shadow-[2px_2px_41px_rgba(0,0,0,0.1)] mb-2 h-[180px] min-h-[180px] grid grid-cols-[40%_60%] rounded-2xl relative hover'>
      <div className=' '>
        <img
          className='h-[180px] object-cover rounded'
          src={images[0]?.image_url}
          alt=''
        />
      </div>
      <div className=' p-2'>
        <p>{product.name}</p>
        <p className='my-1'>{product.description}</p>
        <p>{product.price}</p>
      </div>
      <div className='flex justify-end  absolute bottom-0 w-full'>
        {/* <AddToCartButton  front/> */}

        <Link to={`/single-product/${product.id}`}>
          <span className='badge badge-neutral cursor-pointer'>
            more details
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SearchPageCard
