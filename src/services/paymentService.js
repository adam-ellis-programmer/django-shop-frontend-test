// src/services/paymentService.js
import axios from 'axios'
import { API_URL } from '../config'

// Configure axios with cookie authentication
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Function to get CSRF token if needed for Django
function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1]
}

const paymentService = {
  // Calculate the payment total from the cart
  calculatePayment: async () => {
    try {
      const response = await authAxios.get('/payment/calculate/')
      // console.log('TOTAL RESPONSE FROM SERVICE', response)
      return response.data
    } catch (error) {
      console.error('Error calculating payment:', error)
      throw error.response ? error.response.data : error
    }
  },

  // Create a Stripe checkout session
  createCheckoutSession: async () => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.post(
        '/payment/create-checkout-session/',
        {},
        { headers }
      )

      console.log('--------------  ran from service ----------- ')

      return {
        success: true,
        clientSecret: response.data.clientSecret,
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      return {
        success: false,
        error:
          error.response?.data?.error || 'Failed to create checkout session',
      }
    }
  },

  // Check the status of a payment session
  // used in return page
  checkSessionStatus: async (sessionId) => {
    try {
      const response = await authAxios.get(
        `/payment/session-status/?session_id=${sessionId}`
      )
      return {
        success: true,
        status: response.data,
      }
    } catch (error) {
      console.error('Error checking session status:', error)
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to check session status',
      }
    }
  },
}

export default paymentService
