// src/features/comments/commentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentsService from '../../services/commentService'

// ===============================================================================
// fetch comments
// ===============================================================================

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await commentsService.getComments(productId)
      if (response.success) {
        return response.comments
      } else {
        return rejectWithValue(response.error || 'Failed to fetch comments')
      }
    } catch (error) {
      return rejectWithValue(
        error.error || error.message || 'Failed to fetch comments'
      )
    }
  }
)
// ===============================================================================
// add new comment
// ===============================================================================

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async ({ productId, text, rating }, { rejectWithValue }) => {
    try {
      const response = await commentsService.addComment(productId, text, rating)
      if (response.success) {
        return response.comment
      } else {
        return rejectWithValue(response.error || 'Failed to add comment')
      }
    } catch (error) {
      console.log(
        '--------------------------------------------- from slice.. ',
        error
      )
      return rejectWithValue(
        error.error || error.message || 'Failed to add comment'
      )
    }
  }
)
// ===============================================================================
// update comment
// ===============================================================================

export const updateExistingComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, text, rating }, { rejectWithValue }) => {
    try {
      const response = await commentsService.updateComment(
        commentId,
        text,
        rating
      )
      if (response.success) {
        return response.comment
      } else {
        return rejectWithValue(response.error || 'Failed to update comment')
      }
    } catch (error) {
      return rejectWithValue(
        error.error || error.message || 'Failed to update comment'
      )
    }
  }
)
// ===============================================================================
// delete comments
// ===============================================================================

export const deleteExistingComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await commentsService.deleteComment(commentId)
      if (response.success) {
        return commentId
      } else {
        return rejectWithValue(response.error || 'Failed to delete comment')
      }
    } catch (error) {
      return rejectWithValue(
        error.error || error.message || 'Failed to delete comment'
      )
    }
  }
)

export const fetchUserComments = createAsyncThunk(
  'comments/fetchUserComments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await commentsService.getUserComments()
      if (response.success) {
        return response.comments
      } else {
        return rejectWithValue(
          response.error || 'Failed to fetch user comments'
        )
      }
    } catch (error) {
      return rejectWithValue(
        error.error || error.message || 'Failed to fetch user comments'
      )
    }
  }
)

// ===============================================================================
// Initial state
// ===============================================================================
const initialState = {
  comments: [],
  userComment: null, // Store the current user's comment for the product
  userComments: [], // for logged in authenticated users
  loading: false,
  error: null,
  success: false,
  lastUpdated: null,
}

// Comments slice
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  // ===============================================================================
  // ordinary reducers
  // ===============================================================================
  reducers: {
    resetCommentsError: (state) => {
      state.error = null
    },
    resetCommentsSuccess: (state) => {
      state.success = false
    },
  },

  // ===============================================================================
  // extra reducers
  // ===============================================================================

  extraReducers: (builder) => {
    // ===============================================
    // fetchComments reducers
    // ===============================================
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false
      state.comments = action.payload || []
      state.lastUpdated = new Date().toISOString()

      // Find if user has already commented
      const username = localStorage.getItem('username')
      const userComment =
        username && action.payload
          ? action.payload.find((comment) => comment.username === username)
          : null
      state.userComment = userComment || null
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch comments'
    })

    // ===============================================
    // addNewComment reducers
    // ===============================================
    builder.addCase(addNewComment.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.comments.unshift(action.payload) // Add to beginning of array
        state.userComment = action.payload
      }
      state.lastUpdated = new Date().toISOString()
      state.success = true
    })
    builder.addCase(addNewComment.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to add comment'
      state.success = false
    })

    // ===============================================
    // updateExistingComment reducers
    // ===============================================
    builder.addCase(updateExistingComment.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(updateExistingComment.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload) {
        const index = state.comments.findIndex(
          (c) => c.id === action.payload.id
        )
        if (index !== -1) {
          state.comments[index] = action.payload
        }
        state.userComment = action.payload
      }
      state.lastUpdated = new Date().toISOString()
      state.success = true
    })
    builder.addCase(updateExistingComment.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to update comment'
      state.success = false
    })

    // ===============================================
    // deleteExistingComment reducers
    // ===============================================
    builder.addCase(deleteExistingComment.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(deleteExistingComment.fulfilled, (state, action) => {
      state.loading = false
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      )
      state.userComment = null
      state.lastUpdated = new Date().toISOString()
      state.success = true
    })
    builder.addCase(deleteExistingComment.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to delete comment'
      state.success = false
    })

    // ===============================================
    // fetchUserComments reducers
    // ===============================================
    builder.addCase(fetchUserComments.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserComments.fulfilled, (state, action) => {
      state.loading = false
      state.userComments = action.payload || []
      state.lastUpdated = new Date().toISOString()
    })
    builder.addCase(fetchUserComments.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Failed to fetch user comments'
    })
  },
})

// Export actions
export const { resetCommentsError, resetCommentsSuccess } =
  commentsSlice.actions

// Selectors
export const selectAllComments = (state) => state.comments.comments || []
export const selectUserComment = (state) => state.comments.userComment || null
export const selectCommentsLoading = (state) => state.comments.loading || false
export const selectCommentsError = (state) => state.comments.error || null
export const selectCommentsSuccess = (state) => state.comments.success || false
export const selectUserComments = (state) => state.comments.userComments || []

export default commentsSlice.reducer
