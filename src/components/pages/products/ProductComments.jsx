import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, useParams } from 'react-router-dom'
import Header from '../../Headings/Header'
import ProductComment from './ProductComment'
import {
  fetchComments,
  addNewComment,
  updateExistingComment,
  deleteExistingComment,
  selectAllComments,
  selectUserComment,
  selectCommentsLoading, // Changed from selectCommentsStatus
  selectCommentsError, // This stays the same
  resetCommentsError, // New reset function
  resetCommentsSuccess, // New reset function
} from '../../../features/comments/commentsSlice'

const ProductComments = () => {
  const dispatch = useDispatch()
  // Get the id parameter from the URL (from the route 'single-product/:id')
  const { id } = useParams()

  const comments = useSelector(selectAllComments)
  const userComment = useSelector(selectUserComment)
  const status = useSelector(selectCommentsLoading) // This was selectCommentsStatus, now it's selectCommentsLoading
  const error = useSelector(selectCommentsError)

  const [text, setText] = useState('')
  const [rating, setRating] = useState('')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    // Only fetch comments if we have a valid ID
    if (id) {
      dispatch(fetchComments(id))
    }
  }, [dispatch, id])

  // Pre-fill form if user has already commented
  useEffect(() => {
    if (userComment) {
      setText(userComment.text)
      setRating(userComment.rating.toString())
    }
  }, [userComment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!text.trim()) {
      setSubmitError('Please enter a comment')
      return
    }

    if (!rating) {
      setSubmitError('Please select a rating')
      return
    }

    try {
      if (userComment) {
        // Update existing comment
        await dispatch(
          updateExistingComment({
            commentId: userComment.id,
            text,
            rating,
          })
        ).unwrap()
      } else {
        // Add new comment - use the id from useParams()
        await dispatch(
          addNewComment({
            productId: id, // Use the id from useParams()
            text,
            rating,
          })
        ).unwrap()
      }

      // Clear form if adding new comment
      if (!userComment) {
        setText('')
        setRating('')
      }
    } catch (err) {
      console.log('----- error message ----', err)
      setSubmitError(
        typeof err === 'string'
          ? err
          : err.error || 'An error occurred while submitting your comment'
      )
    }
  }

  const handleDeleteComment = async () => {
    if (
      userComment &&
      window.confirm('Are you sure you want to delete your comment?')
    ) {
      try {
        await dispatch(deleteExistingComment(userComment.id)).unwrap()
        setText('')
        setRating('')
      } catch (err) {
        setSubmitError(
          typeof err === 'string'
            ? err
            : err.error || 'An error occurred while deleting your comment'
        )
      }
    }
  }

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('user')

  return (
    <div className='w-[95%] m-auto mt-5 hover '>
      <Header text={`Product Comments`} styles={`text-center my-5 text-2xl`} />

      {isLoggedIn ? (
        <div>
          <Form className='shadow-2xl p-5' onSubmit={handleSubmit}>
            <div className='my-2'>
              <textarea
                className='textarea w-full'
                placeholder='Share your thoughts about this product...'
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <div>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className='select select-md w-full'
              >
                <option value='' disabled>
                  Select rating
                </option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option value={value} key={value}>
                    {value} {value === 1 ? 'Star' : 'Stars'}
                  </option>
                ))}
              </select>
            </div>

            {submitError && (
              <div className='text-red-500 mt-2'>{submitError}</div>
            )}

            <div className='mt-4 flex justify-end gap-2'>
              {userComment && (
                <button
                  type='button'
                  className='btn btn-outline btn-error'
                  onClick={handleDeleteComment}
                >
                  Delete
                </button>
              )}
              <button
                type='submit'
                className='btn btn-outline btn-primary'
                disabled={status === true} // Changed from status === 'loading'
              >
                {userComment ? 'Update' : 'Submit'}
              </button>
            </div>
          </Form>
        </div>
      ) : (
        <div className='alert alert-info mb-4'>
          Please{' '}
          <a href='/login' className='font-bold'>
            log in
          </a>{' '}
          to leave a comment
        </div>
      )}

      <div className='mt-6 space-y-4'>
        {comments?.map((comment) => (
          <ProductComment
            key={comment.id}
            comment={comment}
            isUserComment={userComment && userComment.id === comment.id}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductComments
