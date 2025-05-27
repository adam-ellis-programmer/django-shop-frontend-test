import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'
import BookmarkButton from './BookmarkButton'
import { formatGBP } from '../../utils/helperUtils'

const ProductCard = ({ prod }) => {
  // console.log(prod)
  return (
    <Link
      key={prod?.id}
      className='relative category-card-dark'
      to={`/single-product/${prod?.id}`}
    >
      <div className='card bg-base-100 w-full shadow-sm min-h-[530px] z-1'>
        <figure className=''>
          <img
            className='h-[300px] w-full object-cover z-0' // Remove relative from the image
            src={prod?.images[0]?.image_url}
            alt='Shoes'
          />
          {prod?.new && (
            <div className='badge badge-secondary absolute top-[54%] right-0 z-20'>
              NEW
            </div>
          )}
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{prod?.name}</h2>
          <h3 className='card-title'>{formatGBP(prod?.price)}</h3>
          <p>{prod?.description}</p>
          <div className='flex justify-end  items-center'>
            {/*  controll buttons */}
            <AddToCartButton front />
            <BookmarkButton product={prod} />
          </div>
          <div className='card-actions justify-end'>
            {prod?.tags
              .split(',')
              .slice(0, 3)
              .map((tag) => {
                return (
                  <div key={tag} className='badge badge-outline'>
                    {tag}
                  </div>
                )
              })}
          </div>
        </div>
        {prod?.specialOffer && (
          <div className='rotate-4 leading-5.5 text-center text-[1.2rem] text-white absolute top-0 right-0 w-[80px] h-[80px] rouded-[50%] bg-red-500 rounded-full flex items-center justify-center'>
            on <br /> offer
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
