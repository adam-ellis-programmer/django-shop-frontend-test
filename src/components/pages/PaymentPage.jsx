import React from 'react'
import { useEffect } from 'react'
import StripePaymentForm from '../cart/StripePaymentForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  calculatePayment,
  selectPaymentDetails,
} from '../../features/payment/paymentSlice'
import Header from '../Headings/Header'

import CustomerDetails from '../../payment/CustomerDetails'
import { useNavigate } from 'react-router-dom'
const PaymentPage = () => {

  const dispatch = useDispatch()

  const paymentDetails = useSelector(selectPaymentDetails)
  console.log(paymentDetails)

  useEffect(() => {
    scrollTo({ top: 0 })
    dispatch(calculatePayment())
  }, [])



  return (
    <div className='m-h align-element '>
      <Header
        text={`process your payment `}
        styles={`text-center text-4xl mt-10`}
      />
      <p className='text-center text-[1.2rem] text-secondary'>nearly there!</p>

      <section className='mt-5 grid lg:grid-cols-2 min-h-[80vh] mb-10'>
        <div className=''>
          <section className='my-10'>
            <CustomerDetails />
          </section>
          <section>
            <div className=' grid lg:grid-cols-3 max-w-[500px] m-auto gap-7'>
              {paymentDetails?.items.map((item, i) => {
                const { images } = item
                return (
                  <div key={i} className=''>
                    <img
                      className='lg:h-30 w-full object-cover rounded-2xl shadow-2x hover'
                      src={images[0]?.url}
                      alt=''
                    />
                  </div>
                )
              })}
            </div>
          </section>
        </div>
        <div className=''>
          <StripePaymentForm />
        </div>
      </section>
    </div>
  )
}

export default PaymentPage
