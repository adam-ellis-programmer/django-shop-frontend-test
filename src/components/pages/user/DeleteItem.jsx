

const DeleteItem = ({ product }) => {
  return (
    <div className=''>
      <div className='card bg-base-100 shadow-sm w-full'>
        <figure>
          <img
            className='h-[240px] w-[100%] object-cover object-center'
            src={product?.images[0]?.image_url}
            alt='product for delete'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>
            {product?.name}

            {product?.new && <div className='badge badge-secondary'>NEW</div>}
          </h2>
          <p>{product?.description}</p>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>Fashion</div>
            <div className='badge badge-outline'>Products</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteItem
