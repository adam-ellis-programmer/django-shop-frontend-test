import React, { useEffect } from 'react'
import SectionTitle from '../layout/SectionTitle'
import CartItem from './CartItem'
import Header from '../Headings/Header'
import CustomerDetails from '../../payment/CustomerDetails'
import CartTable from './CartTable'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCart,
  selectCartItems,
  selectSuccess,
  selectCartTotalPrice,
} from '../../features/cart/cartSlice'

import {
  calculatePayment,
  selectPaymentTotal,
} from '../../features/payment/paymentSlice'
import { selectProductsError } from '../../features/products/productsSlice'
import CartPayBtn from './CartPayBtn'
import { formatGBP } from '../../utils/helperUtils'

const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const error = useSelector(selectProductsError)
  const success = useSelector(selectSuccess)
  const totalAmount = useSelector(selectPaymentTotal)

  // Calculate a fallback total if the payment state is not loaded yet
  const calculateFallbackTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * (item.quantity || 0)
    }, 0)
  }

  // console.log(cartItems)

  const displayTotal = totalAmount || calculateFallbackTotal()

  useEffect(() => {
    // Fetch cart first
    dispatch(fetchCart()).then(() => {
      // Then calculate payment once cart is loaded
      dispatch(calculatePayment())
      // .unwrap()
      // .then((i) => console.log(i))
    })
  }, [dispatch])

  return (
    <div className='align-element m-h'>
      <SectionTitle text={`Your Cart`} />
      <div className='grid lg:grid-cols-[0.5fr_1fr] gap-4 mt-9 mb-10'>
        <div>
          <Header
            text={`${cartItems?.length || 0} Items In Cart`}
            styles={`text-3xl text-center my-7`}
          />
          <div className='h-[33rem] overflow-scroll shadow-2xl rounded-2xl'>
            {cartItems?.map((item, index) => {
              return <CartItem key={item.id} item={item} index={index} />
            })}
          </div>
        </div>

        <div className=' '>
          <Header
            text={`Make Payment`}
            price={`${formatGBP(displayTotal)} `}
            styles={`text-3xl text-center my-7  animate-bounce`}
          />
          {/* <CustomerDetails /> */}
          <div className=' m-auto mt-5 w-3/4'>
            <CartTable cartItems={cartItems} />
            <CartPayBtn />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
