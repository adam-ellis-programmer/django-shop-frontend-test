import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCart,
  selectCartItemCount,
  selectCartItems,
} from '../../features/cart/cartSlice'
import { selectUser } from '../../features/user/userSlice'

const CartLink = ({ setIsNavOpen, mobile }) => {
  const loggedInUser = useSelector(selectUser)
  const dispatch = useDispatch()
  const itemsCount = useSelector(selectCartItemCount)
  useEffect(() => {
    if (loggedInUser) dispatch(fetchCart())
    return () => {}
  }, [loggedInUser])
  return (
    <Link
      to='cart'
      onClick={() => setIsNavOpen(false)}
      className={`md:hidden ${mobile && 'mt-5'}`}
    >
      <span className='relative'>
        <i className='fa-solid text-3xl fa-cart-shopping mr-7'></i>
        <span className=' absolute top-[-25px] right-[3px] indicator-item indicator-middle indicator-start badge badge-secondary'>
          {itemsCount || 0}
        </span>
      </span>
    </Link>
  )
}

export default CartLink
