// ==================================================================
// file imports
// ==================================================================

import axios from 'axios'
import { API_URL } from '../config'

// ==================================================================
// Helper function to get CSRF token
// ==================================================================
const getCsrfToken = () => {
  return (
    document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('csrftoken='))
      ?.split('=')[1] || ''
  )
}

// ==================================================================
// Configure axios for CSRF handling
// ==================================================================
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

// ==================================================================
// Regular axios instance for public endpoints
// ==================================================================
const publicAxios = axios.create({
  baseURL: API_URL,
})

// ==================================================================
// Axios instance with auth headers for protected endpoints
// ==================================================================
const authAxios = axios.create({
  baseURL: API_URL,
})

// ==================================================================
// interceptors get token
// ==================================================================
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // Add CSRF token to all non-GET requests
    if (config.method !== 'get') {
      const csrfToken = getCsrfToken()
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const productService = {
  // ==================================================================
  // public get products with pagination
  // ==================================================================
  getPublicProducts: async ({
    page = 1,
    pageSize = 9,
    category = null,
  } = {}) => {
    try {
      let url = '/products/'

      // Build query parameters
      const params = new URLSearchParams()
      // =================================
      // ------- PARAMS AND {}
      // =================================

      // Add pagination parameters
      params.append('page', page.toString())
      params.append('pageSize', pageSize.toString())

      // Add category filter if provided
      if (category) {
        params.append('category', category)
      }

      // Construct final URL
      if (params.toString()) {
        url += `?${params.toString()}`
      }

      // console.log('Fetching products from:', url) // Debug log

      const response = await publicAxios.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching public products:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // public get product by id
  // ==================================================================
  getPublicProductById: async (productId) => {
    try {
      const response = await publicAxios.get(`/products/${productId}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching public product details:', error)
      throw error.response ? error.response.data : error
    }
  },
  // ==================================================================
  // auth add product
  // ==================================================================
  addProduct: async (formData) => {
    try {
      const response = await authAxios.post('/add-product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error adding product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // In productService.js
  getCustomerProductById: async (productId) => {
    try {
      const response = await authAxios.get(`/customer-products/${productId}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching customer product details:', error)
      throw error.response ? error.response.data : error
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await authAxios.delete(
        `/customer-products/${productId}/delete/`
      )
      return response.data
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // auth get customer products
  // ==================================================================
  getCustomerProducts: async () => {
    try {
      const response = await authAxios.get('/customer-products/')
      return response.data
    } catch (error) {
      console.error('Error fetching customer products:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // update product information
  // ==================================================================
  updateProduct: async (productId, formData) => {
    try {
      const response = await authAxios.post(
        `/customer-products/${productId}/update/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error updating product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // auth get product by id to update
  // ==================================================================
  getCustomerProductById: async (productId) => {
    try {
      const response = await authAxios.get(`/customer-products/${productId}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching customer product:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ==================================================================
  // search bar / search prodcuts
  // ==================================================================
  searchProducts: async (query) => {
    // console.log('QUERY FROM SERVICE---->', query)
    try {
      const response = await publicAxios.get(
        `/products/search/?q=${encodeURIComponent(query)}`
      )
      return response.data
    } catch (error) {
      console.error('Error searching products:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default productService
