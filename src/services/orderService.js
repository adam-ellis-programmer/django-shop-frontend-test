// src/services/orderService.js
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

// Order service functions
const orderService = {
  // Get the current customer's orders
  getOrders: async () => {
    try {
      const response = await authAxios.get('/orders')
      return response.data
    } catch (error) {
      console.error('Error getting orders:', error)
      throw error.response ? error.response.data : error
    }
  },

  // Get a specific order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await authAxios.get(`/orders/${orderId}`)
      return response.data
    } catch (error) {
      console.error(`Error getting order #${orderId}:`, error)
      throw error.response ? error.response.data : error
    }
  },
}

export default orderService
