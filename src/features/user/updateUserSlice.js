// src/features/users/updateUserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import updateUserService from '../../services/updateUserService'

// Async thunks
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    // console.log(userId)
    try {
      const response = await updateUserService.getUser(userId)
      // console.log('RESP=====>', response)
      if (response.success) {
        return response.user
      } else {
        return rejectWithValue(response.error || 'Failed to fetch user data')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user data')
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUserService.updateUser(userId, userData)
      if (response.success) {
        return response.user
      } else {
        return rejectWithValue(response.error || 'Failed to update user data')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update user data')
    }
  }
)

// Initial state
const initialState = {
  userData: null,
  loading: false,
  error: null,
  success: false,
  lastUpdated: null,
}

// User slice
export const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    // Local reducers
    resetUserError: (state) => {
      state.error = null
    },
    resetUserSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    // fetchUser reducers
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch user data'
    })

    // updateUser reducers
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload
      state.lastUpdated = new Date().toISOString()
      state.success = true
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to update user data'
    })
  },
})

// Export actions
export const { resetUserError, resetUserSuccess } = updateUserSlice.actions

// Selectors
export const selectUserData = (state) => state.updateUser.userData
export const selectUserLoading = (state) => state.updateUser.loading
export const selectUserError = (state) => state.updateUser.error
export const selectUserSuccess = (state) => state.updateUser.success

export default updateUserSlice.reducer
