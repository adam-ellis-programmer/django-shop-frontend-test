import products from '../data/products'

{
  /* <img src="https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" /> */
}

export const TestProds = () => {
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure>
        <img
          src='https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=800'
          alt='Shoes'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          Card Title
          <div className='badge badge-secondary'>NEW</div>
        </h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className='card-actions justify-end'>
          <div className='badge badge-outline'>Fashion</div>
          <div className='badge badge-outline'>Products</div>
        </div>
      </div>
    </div>
  )
}
