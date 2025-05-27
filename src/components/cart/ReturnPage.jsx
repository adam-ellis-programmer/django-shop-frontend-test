import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../features/cart/cartSlice'
import paymentService from '../../services/paymentService'

const ReturnPage = () => {
  const [status, setStatus] = useState('loading')
  const [customerEmail, setCustomerEmail] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const sessionId = queryParams.get('session_id')

    if (!sessionId) {
      setError('No session ID found')
      setStatus('error')
      return
    }

    // Check session status
    const checkStatus = async () => {
      try {
        // Use payment service to check session status
        const response = await paymentService.checkSessionStatus(sessionId)
        console.log('response === frontend', response)

        if (!response.success) {
          throw new Error(response.error || 'Failed to check payment status')
        }

        //  ------  make slice call here to place order in database -------

        const data = response.status
        setStatus(data.status)

        if (data.customer_email) {
          setCustomerEmail(data.customer_email)
        }

        // If payment is complete, clear the cart
        if (data.status === 'complete') {
          dispatch(clearCart())
        }
      } catch (err) {
        console.error('Error checking session status:', err)
        setError(err.message || 'Failed to check payment status')
        setStatus('error')
      }
    }

    checkStatus()
  }, [location.search])

  // return <h1>hello</h1>

  if (status === 'loading') {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        <p className='ml-3'>Verifying your payment...</p>
      </div>
    )
  }

  if (status === 'error' || error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-red-50 p-8 rounded-lg shadow-md max-w-md w-full'>
          <h2 className='text-2xl font-bold text-red-700 mb-4'>
            Payment Error
          </h2>
          <p className='text-red-600 mb-6'>
            {error || 'There was an error processing your payment.'}
          </p>
          <button
            onClick={() => navigate('/cart')}
            className='w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition'
          >
            Return to Cart
          </button>
        </div>
      </div>
    )
  }

  if (status === 'open') {
    // If the session is still open, redirect back to checkout
    navigate('/payment')
    return null
  }

  if (status === 'complete') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full'>
          <div className='bg-green-100 rounded-full p-2 w-12 h-12 flex items-center justify-center mx-auto mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-green-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>

          <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>
            Payment Successful!
          </h2>

          <p className='text-gray-600 mb-6 text-center'>
            Thank you for your purchase!{' '}
            {customerEmail &&
              `A confirmation email will be sent to ${customerEmail}.`}
          </p>

          <div className='text-sm text-gray-500 mb-6'>
            <p>
              If you have any questions about your order, please email{' '}
              <a
                href='mailto:support@yourstore.com'
                className='text-blue-600 hover:underline'
              >
                support@yourstore.com
              </a>
              .
            </p>
          </div>

          <div className='flex space-x-4'>
            <button
              onClick={() => navigate('/my-orders')}
              className='flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
            >
              View Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className='flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default return for any other status
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full'>
        <h2 className='text-xl font-semibold mb-4'>Payment Status: {status}</h2>
        <p className='mb-4'>Your payment is being processed.</p>
        <button
          onClick={() => navigate('/')}
          className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}

export default ReturnPage
