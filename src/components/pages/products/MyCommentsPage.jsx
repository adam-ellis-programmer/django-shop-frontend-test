// src/components/Pages/Comments/MyCommentsPage.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserComments,
  deleteExistingComment,
  selectUserComments,
  selectCommentsLoading,
  selectCommentsError,
} from '../../../features/comments/commentsSlice'
import Header from '../../Headings/Header'
import placeholderImage from '../../../place holders/cam.jpg'
import useTestUserCheck from '../../../hooks/useTestUserCheck'

const MyCommentsPage = () => {
  const { checkTestUser } = useTestUserCheck()
  const dispatch = useDispatch()
  const userComments = useSelector(selectUserComments)
  const loading = useSelector(selectCommentsLoading)
  const error = useSelector(selectCommentsError)

  useEffect(() => {
    // Fetch all comments for the current user when component mounts
    dispatch(fetchUserComments())
  }, [dispatch])

  const handleDelete = (commentId) => {
    if (checkTestUser()) return
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteExistingComment(commentId))
        .unwrap()
        .then(() => {
          // Refresh the list after successful deletion
          dispatch(fetchUserComments())
        })
        .catch((error) => {
          console.error('Failed to delete comment:', error)
        })
    }
  }

  if (loading) {
    return (
      <div className='align-element m-h'>
        <div className='max-w-[800px] m-auto text-center my-10'>
          <p>Loading your comments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='align-element m-h'>
        <div className='max-w-[800px] m-auto text-center my-10'>
          <p className='text-red-500'>Error: {error}</p>
        </div>
      </div>
    )
  }

  const getBg = (i) => {
    if (i % 2 === 0) {
      return 'bg-gray-100 order-item'
    } else {
      return 'order-item2'
    }
  }
  return (
    <div className='align-element m-h'>
      <section className='max-w-[800px] m-auto'>
        <Header
          text={`my comments`}
          styles={`text-2xl my-10 text-center capitalize`}
        />

        {userComments.length === 0 ? (
          <p className='text-center'>You haven't made any comments yet.</p>
        ) : (
          userComments.map((comment, i) => (
            <div
              key={comment.id}
              className={`hover2 collapse collapse-arrow ${getBg(i)}`}
            >
              <input
                type='radio'
                name='my-accordion-2'
                defaultChecked={i === 0}
              />
              <div className='collapse-title font-semibold'>
                {comment.product_name}
              </div>
              <div className='collapse-content text-sm grid gap-4 grid-cols-[8%_64%_16%]'>
                <div className=''>
                  <img
                    className='w-full max-w-[100px]'
                    src={comment.product_image || placeholderImage}
                    alt={comment.product_name}
                  />
                </div>
                <div className=''>
                  <div className='mb-2'>
                    <span className='font-semibold'>Rating:</span>{' '}
                    {comment.rating}/5
                  </div>
                  <div>
                    <span className='font-semibold'>Comment:</span>{' '}
                    {comment.text}
                  </div>
                </div>
                <div className='w-full'>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className='btn btn-secondary'
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default MyCommentsPage
