import React from 'react'
import { Link } from 'react-router-dom'
const FeaturedProduct = ({ prod }) => {
  return (
    <Link to={`/single-product/${prod.id}`} className='category-card-dark'>
      <div className='card bg-base-100 shadow-sm md:h-auto lg:card-side lg:h-[200px] w-full relative'>
        <figure>
          <img
            className='min-w-[350px] max-w-[350px] h-[200px] object-cover'
            src={prod.images[0]?.image_url}
            alt='Album'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{prod?.name}</h2>
          <p>{prod?.description}</p>
          <div className='card-actions justify-end'>
            <button className='btn btn-active btn-secondary'>
              More Details
            </button>
          </div>
        </div>
        <span className=' leading-6 text-center grid place-items-center text-2xl text-white bg-orange-500 absolute -top-5 -left-5 w-[80px] h-[80px] rounded-full'>
          {prod.percentageOff}% <br /> off
        </span>
      </div>
    </Link>
  )
}

export default FeaturedProduct
