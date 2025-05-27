// src/features/bookmark/bookmarkSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookmarkService from '../../services/bookMarkService'

// Async thunks
export const fetchBookmarks = createAsyncThunk(
  'bookmark/fetchBookmarks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.getUserBookmarks()
      if (response.success) {
        return response.bookmarks
      } else {
        return rejectWithValue(response.error || 'Failed to fetch bookmarks')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch bookmarks')
    }
  }
)

export const toggleBookmark = createAsyncThunk(
  'bookmark/toggleBookmark',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.toggleBookmark(productId)
      if (response.success) {
        return response.bookmarks
      } else {
        return rejectWithValue(response.error || 'Failed to toggle bookmark')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to toggle bookmark')
    }
  }
)

export const removeBookmark = createAsyncThunk(
  'bookmark/removeBookmark',
  async (bookmarkId, { rejectWithValue }) => {
    try {
      const response = await bookmarkService.removeBookmark(bookmarkId)
      if (response.success) {
        return response.bookmarks
      } else {
        return rejectWithValue(response.error || 'Failed to remove bookmark')
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove bookmark')
    }
  }
)

// Initial state
const initialState = {
  bookmarks: [],
  loading: false,
  error: null,
  success: false,
  lastUpdated: null,
}

// Bookmark slice
export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    // Local reducers (if needed)
    resetBookmarkError: (state) => {
      state.error = null
    },
    resetBookmarkSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    // fetchBookmarks reducers
    builder.addCase(fetchBookmarks.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
      state.loading = false
      state.bookmarks = action.payload || []
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(fetchBookmarks.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch bookmarks'
    })

    // toggleBookmark reducers
    builder.addCase(toggleBookmark.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(toggleBookmark.fulfilled, (state, action) => {
      state.loading = false
      state.bookmarks = action.payload || []
      state.lastUpdated = new Date().toISOString()
      state.success = true
    })
    builder.addCase(toggleBookmark.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to toggle bookmark'
    })

    // removeBookmark reducers
    builder.addCase(removeBookmark.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(removeBookmark.fulfilled, (state, action) => {
      state.loading = false
      state.bookmarks = action.payload || []
      state.lastUpdated = new Date().toISOString()
      state.success = true
    })
    builder.addCase(removeBookmark.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to remove bookmark'
    })
  },
})

// Export actions
export const { resetBookmarkError, resetBookmarkSuccess } =
  bookmarkSlice.actions

// Selectors
export const selectBookmarks = (state) => state.bookmark.bookmarks
export const selectBookmarkLoading = (state) => state.bookmark.loading
export const selectBookmarkError = (state) => state.bookmark.error
export const selectBookmarkSuccess = (state) => state.bookmark.success

export default bookmarkSlice.reducer
