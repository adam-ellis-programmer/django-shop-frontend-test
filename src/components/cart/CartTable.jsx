import React from 'react'
import { useSelector } from 'react-redux'
import { selectPaymentTotal } from '../../features/payment/paymentSlice'
import { formatGBP } from '../../utils/helperUtils'

const CartTable = ({ cartItems }) => {
  const totalAmount = useSelector(selectPaymentTotal) || 0

  // Calculate a fallback total if the Redux state isn't loaded yet
  const calculateFallbackTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * (item.quantity || 0)
    }, 0)
  }

  // Use the Redux state total if available, otherwise use the fallback
  const displayTotal = totalAmount || calculateFallbackTotal()

  const getBg = (i) => {
    if (i % 2 === 0) {
      return 'bg-gray-300 dark-btn-2'
    } else {
      return ''
    }
  }

  return (
    <div className='overflow-x-auto '>
      {/* wrapped for scroll */}
      <div className='max-h-64 overflow-auto '>
        <table className='table'>
          {/* head */}
          <thead className='sticky top-0 bg-white'>
            <tr>
              <th></th>
              <th>Name</th>
              <th>description</th>
              <th>quantity</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody className=''>
            {cartItems?.map((item, i) => {
              const { product, quantity } = item
              return (
                // The modulo operator (%) with 1 will always return 0 for integers,
                // so it's not useful for alternating patterns. You need to use % 2
                // to alternate between even and odd.
                <tr key={i} className={`${getBg(i)} `}>
                  <th>{i + 1}</th>
                  <td>{product?.name}</td>
                  <td>{product?.description?.slice(0, 50) || ''}...</td>
                  <td>{quantity}</td>
                  <td>{formatGBP(product?.price) || 0}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end'>
        <p className='border-b-1 flex-1 flex justify-between items-end bg-gray-600 text-white p-2'>
          <span>
            total <i className='fa-solid fa-money-bill-wave ml-2'></i>
          </span>
          <span className='mr-5'>{formatGBP(displayTotal)}</span>
        </p>
      </div>
    </div>
  )
}

export default CartTable
