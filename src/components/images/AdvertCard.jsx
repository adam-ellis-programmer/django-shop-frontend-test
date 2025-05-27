import React from 'react'
import { Link } from 'react-router-dom'
import { formatGBP } from '../../utils/helperUtils'

const AdvertCard = ({ item }) => {
  const { images, description, id, price } = item
  return (
    <div className='card bg-base-100 w-fit shadow-sm mb-5 '>
      <figure className='px-10 pt-10'>
        <img src={images[0].image_url} alt='Shoes' className='rounded-xl' />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>Card Title</h2>
        <p>{description}</p>
        <p className='badge badge-secondary'>{formatGBP(price)}</p>
        <div className='card-actions'>
          <Link to={`/single-product/${id}`}>
            <button className='btn btn-primary'>Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdvertCard
