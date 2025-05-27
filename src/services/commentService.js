// src/services/commentsService.js
import axios from 'axios'
import { API_URL } from '../config'

// ===============================================================================
// Configure axios with cookie authentication
// ===============================================================================

const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // IMPORTANT: This enables sending cookies with requests
})

// ===============================================================================
// Function to get CSRF token if needed for Django
// ===============================================================================

function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1]
}

// ===============================================================================
// Comments service functions
// ===============================================================================

const commentsService = {
  // Get comments for a product
  getComments: async (productId) => {
    try {
      const response = await authAxios.get(`/products/${productId}/comments/`)
      return response.data
    } catch (error) {
      console.error('Error getting comments:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ===============================================================================
  // Add a comment to a product
  // ===============================================================================

  addComment: async (productId, text, rating) => {
    try {
      // Get CSRF token if needed (for Django)
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      // Make the request
      const response = await authAxios.post(
        `/products/${productId}/comments/add/`,
        {
          text,
          rating,
        },
        { headers }
      )

      return response.data
    } catch (error) {
      console.error(
        'Error adding comment from service',
        error.response || error
      )
      throw error.response ? error.response.data : error
    }
  },

  // ===============================================================================
  // Update an existing comment
  // ===============================================================================

  updateComment: async (commentId, text, rating) => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.put(
        `/comments/${commentId}/update/`,
        {
          text,
          rating,
        },
        { headers }
      )

      return response.data
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error.response ? error.response.data : error
    }
  },

  // ===============================================================================
  // Delete a comment
  // ===============================================================================

  deleteComment: async (commentId) => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.delete(
        `/comments/${commentId}/delete/`,
        {
          headers,
        }
      )

      return response.data
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error.response ? error.response.data : error
    }
  },

  getUserComments: async () => {
    try {
      const response = await authAxios.get('/user/comments/')
      return response.data
    } catch (error) {
      console.error('Error getting user comments:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default commentsService
