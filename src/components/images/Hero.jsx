import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero bg-base-200 min-h-[300px] mt-5 relative card hero-dark '>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Shop till you drop</h1>
          <p className='py-6'>
            We have many items for you to choose from an with our price match on
            hundreds of products you will be pounds in pocket when you shop with
            us.
            {/* Watch out for our rewards scheme too! */}
          </p>
          <Link to={`/products`}>
            <button className='btn btn-primary'>Get Shopping</button>
          </Link>
        </div>
      </div>

      <img
        className='hidden lg:block  w-[300px] h-[300px] rounded-[8px] absolute left-0 object-cover'
        src='https://images.pexels.com/photos/6400300/pexels-photo-6400300.jpeg?auto=compress&cs=tinysrgb&w=800'
        alt=''
      />
      <img
        className='hidden lg:block  w-[300px] h-[300px] rounded-[8px] absolute right-0 object-cover'
        src='https://images.pexels.com/photos/9969229/pexels-photo-9969229.jpeg?auto=compress&cs=tinysrgb&w=800'
        alt=''
      />
    </div>
  )
}

export default Hero
