// src/features/orders/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from '../../services/orderService'

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrders()
      if (response.success) {
        return response.orders
      } else {
        return rejectWithValue(response.error || 'Failed to fetch orders')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch orders')
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderById(orderId)
      if (response.success) {
        return response.order
      } else {
        return rejectWithValue(
          response.error || 'Failed to fetch order details'
        )
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch order details')
    }
  }
)

// Initial state
const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  lastUpdated: null,
}

// Orders slice
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Local reducers
    resetOrderError: (state) => {
      state.error = null
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null
    },
  },
  extraReducers: (builder) => {
    // fetchOrders reducers
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload || []
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch orders'
    })

    // fetchOrderById reducers
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false
      state.selectedOrder = action.payload
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch order details'
    })
  },
})

// Export actions
export const { resetOrderError, clearSelectedOrder } = orderSlice.actions

// Selectors
export const selectOrders = (state) => state.orders.orders
export const selectSelectedOrder = (state) => state.orders.selectedOrder
export const selectOrdersLoading = (state) => state.orders.loading
export const selectOrdersError = (state) => state.orders.error

export default orderSlice.reducer
