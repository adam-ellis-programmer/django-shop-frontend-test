import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import paymentService from '../../services/paymentService' // Adjust path as needed

// Hardcode the publishable key to eliminate any environment variable issues
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const StripePaymentForm = () => {
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch the client secret when the component mounts
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        setLoading(true)
        const response = await paymentService.createCheckoutSession()

        if (response.success && response.clientSecret) {
          setClientSecret(response.clientSecret)
        } else {
          setError(response.error || 'Failed to create checkout session')
        }
      } catch (err) {
        console.error('Error creating checkout session:', err)
        setError('An unexpected error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    getClientSecret()
  }, [])

  if (loading) {
    return (
      <div className='stripe-loading  h-[100%] flex justify-center items-center text-2xl'>
        Loading payment form...
      </div>
    )
  }

  if (error) {
    return <div className='stripe-error'>Error: {error}</div>
  }

  if (!clientSecret) {
    return <div className='stripe-error'>Unable to initialize checkout</div>
  }

  return (
    <div id='checkout'>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default StripePaymentForm
