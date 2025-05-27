// src/services/cartService.js

import axios from 'axios'
import { API_URL } from '../config'

// Configure axios with cookie authentication
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // IMPORTANT: This enables sending cookies with requests
})

// Function to get CSRF token if needed for Django
function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1]
}

// Cart service functions
const cartService = {
  // Get the current customer's cart
  getCart: async () => {
    try {
      const response = await authAxios.get('/cart/')
      return response.data
    } catch (error) {
      console.error('Error getting cart:', error)
      throw error.response ? error.response.data : error
    }
  },

  // Add a product to the cart --- 
  addToCart: async (productId, quantity = 1) => {
    try {
      console.log(
        'Adding to cart, product ID:',
        productId,
        'quantity:',
        quantity
      )

      // Get CSRF token if needed (for Django)
      const csrfToken = getCsrfToken()

      console.log(csrfToken)

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      // Make the request with proper data format and hardcoded URL
      const response = await authAxios.post(
        '/cart/add/',
        {
          product_id: productId,
          quantity,
        },
        { headers }
      )

      console.log('Add to cart response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error adding to cart:', error.response || error)
      throw error.response ? error.response.data : error
    }
  },

  // Update the quantity of a cart item
  updateCartItem: async (itemId, quantity) => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.put(
        `/cart/update/${itemId}/`,
        {
          quantity,
        },
        { headers }
      )

      return response.data
    } catch (error) {
      console.error('Error updating cart item:', error)
      throw error.response ? error.response.data : error
    }
  },

  // Remove an item from the cart
  removeFromCart: async (itemId) => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.delete(`/cart/remove/${itemId}/`, {
        headers,
      })

      return response.data
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw error.response ? error.response.data : error
    }
  },

  // Clear the entire cart
  clearCart: async () => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.delete(
        '/cart/clear/',
        {
          headers,
        }
      )

      return response.data
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default cartService
