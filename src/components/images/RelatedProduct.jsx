import { Link } from 'react-router-dom'
import img from '../../place holders/cam.jpg'
import { formatGBP } from '../../utils/helperUtils'

const getValue = (value) => {
  if (value === true) return 'New'
}

const RelatedProduct = ({ product }) => {
  const { images } = product
  return (
    <div className='mt-6 w-full xl:w-full shadow-[1px_1px_10px_#ccc] p-5  rounded-2xl relative hover dark-box-shadow-1'>
      {product?.new && (
        <div className=' flex justify-end absolute -top-0 w-full left-0 right-0 '>
          <div className='badge badge-dash badge-secondary '>
            {getValue(product?.new)}
          </div>
        </div>
      )}
      {/* w-[200px] h-[150px] */}
      <div className='flex flex-col md:flex-row'>
        <img
          src={product?.images[0]?.image_url}
          // src={img}
          alt=''
          // className='h-[130px] md:w-[130px]  w-full object-cover'
          className='md:h-[100px] rounded md:shadow-2xl'
        />

        <div className='ml-7'>
          <h2 className='font-bold '>{product?.name}</h2>
          <p className=' '>{product?.description}</p>

          <div className='flex justify-between '>
            <p className=''>
              <span className='badge badge-primary py-1 text-white text-[1.1em]'>
              {formatGBP(product?.price)}
              </span>
            </p>
            <Link to={`/single-product/${product?.id}`}>
              <button className='btn btn-active btn-secondary h-[30px]'>
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedProduct
