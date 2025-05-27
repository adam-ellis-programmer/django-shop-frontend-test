// src/store/userSlice.js

// ==================================================================
// imports
// ==================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { resetCartCount } from '../cart/cartSlice'

// const API_URL = 'http://localhost:8000/api'
import { API_URL } from '../../config'

// ==================================================================
// fetch products public
// ==================================================================
function getCsrfToken() {
  const value = `; ${document.cookie}`
  const parts = value.split(`; csrftoken=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return ''
}

// ==================================================================
// fetch products public
// ==================================================================
const getInitialState = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  return {
    user,
    status: 'idle',
    error: null,
  }
}

// ==================================================================
// fetch products public
// ==================================================================
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName,
          last_name: userData.lastName,
        }),
        credentials: 'include', // Important: needed to include cookies
      })

      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }

      const data = await response.json()
      // Only store user info in localStorage, not the token
      localStorage.setItem('user', JSON.stringify(data.user))

      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred')
    }
  }
)
// ==================================================================
// fetch products public
// ==================================================================
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData || 'Invalid credentials')
      }

      const data = await response.json()
      // Only store user info in localStorage, not the token
      localStorage.setItem('user', JSON.stringify(data.user))

      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred')
    }
  }
)

// ==================================================================
// log out and clear cookies
// ==================================================================
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (
    _,
    {
      dispatch, // Redux dispatch function
      getState, // Function to get current Redux state
      rejectWithValue, // Function to return rejected value
      fulfillWithValue, // Function to return fulfilled value (rarely used)
      requestId, // Unique ID for this specific request
      signal, // AbortController signal for cancellation
      extra,
    }
  ) => {
    try {
      // Call a logout endpoint that will clear the cookie
      const response = await fetch(`${API_URL}/auth/logout/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }

      // Clear local storage
      localStorage.removeItem('user')
      dispatch(resetCartCount())

      return { success: true }
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed')
    }
  }
)

// ==================================================================
// initial state
// ==================================================================

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),

  // ==================================================================
  // main reducers
  // ==================================================================
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  // ==================================================================
  // extra reducers
  // ==================================================================
  extraReducers: (builder) => {
    builder
      // ==================================================================
      // register cases
      // ==================================================================
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Registration failed'
      })
      // ==================================================================
      // login cases
      // ==================================================================
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Login failed'
      })
      // ==================================================================
      // logout cases
      // ==================================================================
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.status = 'idle'
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Logout failed'
      })
  },
})

export const { clearError } = userSlice.actions

// ==================================================================
// selectors
// ==================================================================
export const selectUser = (state) => state.user.user
export const selectAuthStatus = (state) => state.user.status
export const selectAuthError = (state) => state.user.error
export const selectIsAuthenticated = (state) => !!state.user.user

export default userSlice.reducer
