// src/features/products/productsSlice.jsx
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import productService from '../../services/productService'

// ==================================================================
// Add product (authenticated)
// ==================================================================
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (formData, { rejectWithValue }) => {
    try {
      // Process boolean fields to ensure proper format
      const booleanFields = [
        'featured',
        'inStock',
        'new',
        'onSale',
        'popular',
        'specialOffer',
        'suspend',
      ]

      // If formData contains boolean fields, process them
      if (formData instanceof FormData) {
        booleanFields.forEach((field) => {
          const isChecked = formData.has(field)
          formData.delete(field)
          formData.append(field, isChecked ? 'true' : 'false')
        })
      }

      const response = await productService.addProduct(formData)
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add product')
    }
  }
)

// ==================================================================
// delete customer product (authenticated)
// ==================================================================
export const deleteCustomerProduct = createAsyncThunk(
  'products/deleteCustomerProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productService.deleteProduct(productId)
      return { id: productId, response } // Return both ID and response
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product')
    }
  }
)

// ==================================================================
// fetch customer product by id (authenticated)
// ==================================================================
export const fetchCustomerProductById = createAsyncThunk(
  'products/fetchCustomerById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productService.getCustomerProductById(productId)
      if (response.success) {
        return response.product
      } else {
        return rejectWithValue(response.error || 'Failed to fetch product')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product')
    }
  }
)

// ==================================================================
// update product (authenticated)
// ==================================================================
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      // Process boolean fields similar to addProduct if needed
      const booleanFields = [
        'featured',
        'inStock',
        'new',
        'onSale',
        'popular',
        'specialOffer',
        'suspend',
      ]

      if (formData instanceof FormData) {
        booleanFields.forEach((field) => {
          if (formData.has(field)) {
            const isChecked = formData.get(field) === 'on'
            formData.delete(field)
            formData.append(field, isChecked ? 'true' : 'false')
          }
        })
      }

      const response = await productService.updateProduct(productId, formData)
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product')
    }
  }
)

// ==================================================================
// fetch customer products (authenticated)
// ==================================================================
export const fetchCustomerProducts = createAsyncThunk(
  'products/fetchCustomerProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getCustomerProducts()

      if (response.success) {
        return response.products
      } else {
        return rejectWithValue(
          response.error || 'Failed to fetch your products'
        )
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch your products')
    }
  }
)

// ==================================================================
// fetch products public with pagination
// ==================================================================
export const fetchPublicProducts = createAsyncThunk(
  'products/fetchPublic',
  async (
    { page = 1, pageSize = 9, category = null } = {},
    { rejectWithValue }
  ) => {
    try {
      // Pass pagination parameters
      const response = await productService.getPublicProducts({
        page,
        pageSize,
        category,
      })

      // Return the response data directly
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products')
    }
  }
)

// ==================================================================
// fetch product by id public
// ==================================================================
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productService.getPublicProductById(productId)
      if (response.success) {
        return response.product
      } else {
        return rejectWithValue(response.error || 'Failed to fetch product')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product')
    }
  }
)

// ==================================================================
// search products public
// ==================================================================
export const searchProducts = createAsyncThunk(
  'products/search',
  async (query, { rejectWithValue }) => {
    // console.log('QUERY FROM SLICE--->', query)
    try {
      const response = await productService.searchProducts(query)
      if (response.success) {
        return response.products
      } else {
        return rejectWithValue(response.error || 'Search failed')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Search failed')
    }
  }
)

// ==================================================================
// initial state
// ==================================================================
const initialState = {
  publicProducts: [],
  customerProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  searchResults: [],
  pagination: null, // Add pagination info
  searchQuery: '',
  addProductSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
}

// Create the slice
const productsSlice = createSlice({
  name: 'product', // Using singular to match your state structure
  initialState,
  // ==================================================================
  // core reducers
  // ==================================================================
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    clearProductErrors: (state) => {
      state.error = null
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    resetAddProductSuccess: (state) => {
      state.addProductSuccess = false
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false
    },
    resetDeleteSuccess: (state) => {
      state.deleteSuccess = false
    },
  },

  // ==================================================================
  // extra reducers
  // ==================================================================

  extraReducers: (builder) => {
    // ==============================
    // add product
    // ==============================
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true
      state.error = null
      state.addProductSuccess = false
    })
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.addProductSuccess = true

      // If the response includes the product, you might want to add it to customerProducts
      if (action.payload.product) {
        state.customerProducts.unshift(action.payload.product)
      }
    })
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to add product'
      state.addProductSuccess = false
    })

    // ==============================
    // delete customer product
    // ==============================

    builder.addCase(deleteCustomerProduct.pending, (state) => {
      state.loading = true
      state.error = null
      state.deleteSuccess = false
    })
    builder.addCase(deleteCustomerProduct.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.deleteSuccess = true

      // Remove the deleted product from customerProducts array
      state.customerProducts = state.customerProducts.filter(
        (product) => product.id !== action.payload.id
      )

      // Clear currentProduct if it's the deleted product
      if (
        state.currentProduct &&
        state.currentProduct.id === action.payload.id
      ) {
        state.currentProduct = null
      }
    })
    builder.addCase(deleteCustomerProduct.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to delete product'
      state.deleteSuccess = false
    })

    // ==============================
    // fetch customer product by id
    // ==============================

    builder.addCase(fetchCustomerProductById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchCustomerProductById.fulfilled, (state, action) => {
      state.loading = false
      state.currentProduct = action.payload // Use currentProduct for the editing product
      state.error = null
    })
    builder.addCase(fetchCustomerProductById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch product'
    })

    // ==============================
    // update product
    // ==============================
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true
      state.error = null
      state.updateSuccess = false
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.updateSuccess = true

      // Update currentProduct with the updated data
      state.currentProduct = action.payload.product

      // Also update the product in customerProducts array if it exists there
      if (action.payload.product) {
        const index = state.customerProducts.findIndex(
          (p) => p.id === action.payload.product.id
        )
        if (index !== -1) {
          state.customerProducts[index] = action.payload.product
        }
      }
    })
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to update product'
      state.updateSuccess = false
    })

    // ==============================
    // fetch customer products
    // ==============================
    builder.addCase(fetchCustomerProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchCustomerProducts.fulfilled, (state, action) => {
      state.loading = false
      state.customerProducts = action.payload || []
      state.error = null
    })
    builder.addCase(fetchCustomerProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch your products'
    })

    // ==============================
    // fetch public products (ONLY ONE - REMOVED DUPLICATE)
    // ==============================
    builder.addCase(fetchPublicProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchPublicProducts.fulfilled, (state, action) => {
      state.loading = false
      state.publicProducts = action.payload.products || []
      state.pagination = action.payload.pagination || null // Store pagination info
    })
    builder.addCase(fetchPublicProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    // ==============================
    // get public product by id
    // ==============================

    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false

      // Directly assign products from the response
      // Adjust this based on your actual API response structure
      state.currentProduct = action.payload || []

      // Clear any previous errors
      state.error = null
    })
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch products'
    })

    // ==============================
    // search
    // ==============================

    builder.addCase(searchProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false
      state.searchResults = action.payload
      state.error = null
    })
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Search failed'
    })

    // REMOVED THE DUPLICATE fetchPublicProducts reducers that were at the bottom
  },
})

// Export actions
export const {
  clearCurrentProduct,
  clearProductErrors,
  setSearchQuery,
  resetAddProductSuccess,
  resetUpdateSuccess,
  resetDeleteSuccess,
} = productsSlice.actions

// ==================================================================
// simple selector functions
// ==================================================================
// prettier-ignore
export const selectPublicProducts = (state) => state.product.publicProducts || []
export const selectProductsLoading = (state) => state.product.loading || false
export const selectProductsError = (state) => state.product.error || null
export const selectCurrentProduct = (state) =>
  state.product.currentProduct || null
export const selectCustomerProducts = (state) =>
  state.product.customerProducts || []
// Add this with your other selectors
export const selectUpdateSuccess = (state) =>
  state.product?.updateSuccess || false
export const selectDeleteSuccess = (state) =>
  state.product?.deleteSuccess || false
// search
export const selectSearchResults = (state) => state.product.searchResults || []
export const selectSearchQuery = (state) => state.product.searchQuery || ''
// FIXED: Changed from state.products to state.product (to match your slice name)
export const selectPagination = (state) => state.product.pagination
// ==================================================================
// Add new selector
// ==================================================================
export const selectAddProductSuccess = (state) =>
  state.product.addProductSuccess || false

export default productsSlice.reducer
