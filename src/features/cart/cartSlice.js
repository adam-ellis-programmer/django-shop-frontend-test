// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../../services/cartService'

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart()
      if (response.success) {
        return response.cart
      } else {
        return rejectWithValue(response.error || 'Failed to fetch cart')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cart')
    }
  }
)

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId, quantity)
      if (response.success) {
        return response.cart
      } else {
        return rejectWithValue(response.error || 'Failed to add item to cart')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add item to cart')
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItem(itemId, quantity)
      if (response.success) {
        return response.cart
      } else {
        return rejectWithValue(response.error || 'Failed to update item')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update item')
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(itemId)
      console.log(response)
      if (response.success) {
        return response.cart
      } else {
        return rejectWithValue(response.error || 'Failed to remove item')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove item')
    }
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.clearCart()
      if (response.success) {
        return response.cart
      } else {
        return rejectWithValue(response.error || 'Failed to clear cart')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to clear cart')
    }
  }
)

// Initial state
const initialState = {
  items: [],
  itemCount: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  lastUpdated: null,
  success: false,
  itemsInCart: 0,
}

// Cart slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Local reducers (if needed)
    resetCartError: (state) => {
      state.error = null
    },

    resetCartCount: (state) => {
      state.itemCount = 0
    },

    // reset success
    resetCartSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    // fetchCart reducers
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload.items || []
      state.itemCount = action.payload.item_count || 0
      state.totalPrice = action.payload.total_price || 0
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch cart'
    })

    // addItemToCart reducers
    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload.items || []
      state.itemCount = action.payload.item_count || 0
      state.totalPrice = action.payload.total_price || 0
      state.lastUpdated = new Date().toISOString()
      state.success = true
    })
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to add item to cart'
    })

    // updateCartItem reducers
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload.items || []
      state.itemCount = action.payload.item_count || 0
      state.totalPrice = action.payload.total_price || 0
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to update item'
    })

    // removeCartItem reducers
    builder.addCase(removeCartItem.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload.items || []
      state.itemCount = action.payload.item_count || 0
      state.totalPrice = action.payload.total_price || 0
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to remove item'
    })

    // clearCart reducers
    builder.addCase(clearCart.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.loading = false
      state.success = false
      state.items = []
      state.itemCount = 0
      state.totalPrice = 0
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to clear cart'
    })
  },
})

// Export actions
export const { resetCartError, resetCartSuccess, resetCartCount } =
  cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartItemCount = (state) => state.cart.itemCount
export const selectCartTotalPrice = (state) => state.cart.totalPrice
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error
export const selectSuccess = (state) => state.cart.success
export const selectitemsInCart = (state) => state.cart.itemsInCart

export default cartSlice.reducer
