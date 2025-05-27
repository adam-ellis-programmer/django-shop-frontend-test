import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem } from '../../features/cart/cartSlice'
import useTestUserCheck from '../../hooks/useTestUserCheck'
import { formatGBP } from '../../utils/helperUtils'

const CartItem = ({ item, index }) => {
  const { isTestUser, checkTestUser } = useTestUserCheck()
  const dispatch = useDispatch()
  const { product, quantity } = item

  // console.log(item)

  const handleRemove = (id) => {
    if (checkTestUser()) return
    console.log(id)
    dispatch(removeCartItem(id))
  }

  return (
    <div className='card lg:card-side bg-base-100 shadow-[1px_1px_15px_rgba(0,0,0,0.1)]  mb-5 relative'>
      <figure className='w-full  object-center'>
        <img className='' src={product?.images[0]?.image_url} alt='Album' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{product?.name}</h2>
        <p>{product?.description}</p>
        <p className='flex justify-between border-dashed border-b-[0.1px]'>
          <span>price</span>
          <span>{formatGBP(product?.price)}</span>
        </p>
        <p className='flex justify-between border-dashed border-b-[0.1px]'>
          <span>quantity</span>
          <span>{quantity}</span>
        </p>
        <p className='flex justify-between border-dashed border-b-[0.1px]'>
          <span>total</span>
          <span> {formatGBP(product?.price * quantity)}</span>
        </p>
        <div className='card-actions justify-end '>
          <button
            onClick={() => handleRemove(item.id)}
            className='badge badge-error text-white cursor-pointer'
          >
            remove
          </button>
        </div>
      </div>
      <div className='absolute w-full top-1 px-1 flex justify-end'>
        <div className='badge badge-primary badge-md'>{index + 1}</div>
      </div>
    </div>
  )
}

export default CartItem
