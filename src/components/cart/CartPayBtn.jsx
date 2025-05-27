import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPaymentTotal } from '../../features/payment/paymentSlice'
import { selectCartItems } from '../../features/cart/cartSlice'

const CartPayBtn = () => {
  const totalAmount = useSelector(selectPaymentTotal) || 0
  const cartItems = useSelector(selectCartItems) || []

  // Create a simple payment details object if Redux state isn't available
  const handleClick = () => {
    const simplePaymentDetails = {
      total_amount: totalAmount,
      item_count: cartItems.length,

      items: cartItems.map((item) => ({
        id: item.id,
        product_id: item.product?.id,
        name: item.product?.name,
        price: item.product?.price || 0,
        quantity: item.quantity || 0,
        subtotal: (item.product?.price || 0) * (item.quantity || 0),
      })),
    }

    // Save payment details to localStorage for use in payment page
    localStorage.setItem('paymentDetails', JSON.stringify(simplePaymentDetails))
  }
  // animate-pulse
  return (
    <div className=' m-auto md:flex  justify-end mt-1 '>
      <Link to={`/payment-page`}>
        <button
          onClick={handleClick}
          className='btn btn-secondary text-[1.1rem] w-full'
          disabled={cartItems.length === 0}
        >
          make payment
          <i className='fa-regular fa-credit-card ml-1 text-[1.2rem]'></i>
        </button>
      </Link>
    </div>
  )
}

export default CartPayBtn
