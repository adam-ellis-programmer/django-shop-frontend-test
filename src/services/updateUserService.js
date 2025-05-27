// src/services/updateUserService.js

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

// User service functions
const updateUserService = {
  // Get the current user's data
  getUser: async (userId) => {
    try {
      const response = await authAxios.get(`/get-user/${userId}/`)
      return response.data
    } catch (error) {
      console.error('Error getting user data:', error)
      throw error.response ? error.response.data : error
    }
  },

  // Update the user's data
  updateUser: async (userId, userData) => {
    try {
      // Get CSRF token if needed
      const csrfToken = getCsrfToken()

      // Create headers object
      const headers = {}
      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken
      }

      const response = await authAxios.post(
        `/update-user/${userId}/`,
        userData,
        { headers }
      )

      return response.data
    } catch (error) {
      console.error('Error updating user data:', error)
      throw error.response ? error.response.data : error
    }
  }
}

export default updateUserService