// src/features/filters/filterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import filterService from '../../services/filterService'

// Async thunk for filtering products by category
export const fetchProductsByCategory = createAsyncThunk(
  'filters/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await filterService.getProductsByCategory(category)
      if (response.success) {
        return response.products
      } else {
        return rejectWithValue(
          response.error || 'Failed to fetch filtered products'
        )
      }
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch filtered products'
      )
    }
  }
)

// Initial state
const initialState = {
  filteredProducts: [],
  loading: false,
  error: null,
  count: 0,
}

// Filter slice
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.filteredProducts = []
      state.count = 0
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // fetchProductsByCategory reducers
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false
      state.filteredProducts = action.payload
      state.count = action.payload.length
    })
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch filtered products'
    })
  },
})

// Export actions
export const { resetFilters } = filterSlice.actions

// Selectors
export const selectFilteredProducts = (state) => state.filters.filteredProducts
export const selectFilterLoading = (state) => state.filters.loading
export const selectFilterError = (state) => state.filters.error
export const selectFilterCount = (state) => state.filters.count

export default filterSlice.reducer
