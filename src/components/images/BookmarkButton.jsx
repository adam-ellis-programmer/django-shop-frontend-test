import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleBookmark,
  selectBookmarks,
  selectBookmarkLoading,
  fetchBookmarks,
} from '../../features/bookmarks/bookmarkSlice'
import { selectUser } from '../../features/user/userSlice'
import useTestUserCheck from '../../hooks/useTestUserCheck'

const BookmarkButton = ({ product }) => {
  const { checkTestUser } = useTestUserCheck()
  const loggedInUser = useSelector(selectUser)
  const dispatch = useDispatch()
  const bookmarks = useSelector(selectBookmarks)
  const loading = useSelector(selectBookmarkLoading)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  // Fetch bookmarks if not already loaded
  useEffect(() => {
    if (loggedInUser && bookmarks.length === 0 && !initialLoadDone) {
      dispatch(fetchBookmarks())
      setInitialLoadDone(true)
    }
  }, [dispatch, bookmarks.length, initialLoadDone])

  // Check if the product is already bookmarked whenever bookmarks change
  useEffect(() => {
    if (bookmarks && bookmarks.length > 0) {
      const bookmarked = bookmarks.some(
        (bookmark) => bookmark.product && bookmark.product.id === product.id
      )
      setIsBookmarked(bookmarked)
    } else {
      setIsBookmarked(false)
    }
  }, [bookmarks, product])

  const handleBookmark = (e) => {
    // Stop the event from bubbling up to the Link component
    e.stopPropagation()
    e.preventDefault()
    if (checkTestUser()) return
    dispatch(toggleBookmark(product.id))
  }

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className={`badge ${
        isBookmarked ? 'badge-secondary' : 'badge-primary'
      } badge-md cursor-pointer`}
    >
      <i className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark`}></i>
    </button>
  )
}

export default BookmarkButton
