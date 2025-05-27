// src/services/filterService.js
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

// Filter service functions
const filterService = {
  // Get products by category
  getProductsByCategory: async (category) => {
    console.log('category from service ====>', category)
    try {
      const response = await authAxios.get(
        `/products/filter/?q=${encodeURIComponent(category)}`
      )
      return response.data
    } catch (error) {
      console.error('Error filtering products by category:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default filterService
