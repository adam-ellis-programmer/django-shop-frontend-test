import { useDispatch, useSelector } from 'react-redux'
import {
  removeBookmark,
  selectBookmarkLoading,
} from '../../features/bookmarks/bookmarkSlice'
import useTestUserCheck from '../../hooks/useTestUserCheck'

const BookmarkRemoveButton = ({ bookmark }) => {
  const { checkTestUser } = useTestUserCheck()
  const dispatch = useDispatch()
  const loading = useSelector(selectBookmarkLoading)

  const handleClick = (bookmarkId) => {
    if (checkTestUser()) return
    dispatch(removeBookmark(bookmarkId))
  }

  return (
    <button
      onClick={() => handleClick(bookmark.id)}
      disabled={loading}
      className='badge badge-error text-white cursor-pointer'
    >
      <i className='fa-solid fa-trash-can'></i>
    </button>
  )
}

export default BookmarkRemoveButton
