// src/services/bookmarkService.js
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

// Bookmark service functions
const bookmarkService = {
  // Get all bookmarks for the current user
  getUserBookmarks: async () => {
    try {
      const response = await authAxios.get('/bookmarks/')
      return response.data
    } catch (error) {
      console.error('Error getting bookmarks:', error)
      throw error.response ? error.response.data : error
    }
  },

  // Toggle a bookmark (add if not exists, remove if exists)
  toggleBookmark: async (productId) => {
    try {
      // Get CSRF token if needed (for Django)
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.post(
        '/bookmarks/toggle/',
        {
          product_id: productId,
        },
        { headers }
      )

      return response.data
    } catch (error) {
      console.error('Error toggling bookmark:', error.response || error)
      throw error.response ? error.response.data : error
    }
  },

  // Remove a bookmark
  removeBookmark: async (bookmarkId) => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.delete(`/bookmarks/${bookmarkId}/`, {
        headers,
      })

      return response.data
    } catch (error) {
      console.error('Error removing bookmark:', error)
      throw error.response ? error.response.data : error
    }
  },
}

export default bookmarkService
