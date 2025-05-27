import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import paymentService from '../../services/paymentService'

// Async thunk for payment calculation
export const calculatePayment = createAsyncThunk(
  'payment/calculatePayment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentService.calculatePayment()
      if (response.success) {
        return response.payment
      } else {
        return rejectWithValue(response.error || 'Failed to calculate payment')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to calculate payment')
    }
  }
)

const initialState = {
  paymentDetails: {
    total_amount: 0,
    item_count: 0,
    items: [],
  },
  loading: false,
  error: null,
  success: false,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentError: (state) => {
      state.error = null
    },
    resetPaymentSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    // calculatePayment reducers
    builder.addCase(calculatePayment.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(calculatePayment.fulfilled, (state, action) => {
      state.loading = false
      state.paymentDetails = action.payload
      state.success = true
    })
    builder.addCase(calculatePayment.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to calculate payment'
    })
  },
})

// Export actions
export const { resetPaymentError, resetPaymentSuccess } = paymentSlice.actions

// Selectors
export const selectPaymentDetails = (state) => state.payment.paymentDetails
export const selectPaymentLoading = (state) => state.payment.loading
export const selectPaymentError = (state) => state.payment.error
export const selectPaymentSuccess = (state) => state.payment.success
export const selectPaymentTotal = (state) => {
  // Check if payment state exists and has paymentDetails
  if (!state.payment || !state.payment.paymentDetails) {
    return 0 // Return a default value when not available
  }
  return state.payment.paymentDetails.total_amount || 0
}
export default paymentSlice.reducer
