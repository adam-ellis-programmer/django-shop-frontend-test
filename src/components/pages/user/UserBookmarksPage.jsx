import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBookmarks,
  selectBookmarks,
  selectBookmarkLoading,
} from '../../../features/bookmarks/bookmarkSlice'
import Header from '../../Headings/Header'
import BookmarkRemoveButton from '../../images/BookmarkRemoveButton'
import MainSpinner from '../../spinners/MainSpinner'

function UserBookmarksPage() {
  const dispatch = useDispatch()
  const bookmarks = useSelector(selectBookmarks)
  const loading = useSelector(selectBookmarkLoading)

  useEffect(() => {
    dispatch(fetchBookmarks())
  }, [dispatch])

  if (loading) {
    return (
      <div className='m-h align-element mb-10'>
        <MainSpinner extraStyles={`mt-20`} />
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className='m-h align-element mb-10'>
        <Header
          text={`no bookmarks found`}
          styles={`text-2xl text-center my-5 capitalize`}
        />
      </div>
    )
  }

  return (
    <>
      <div className='m-h align-element mb-10'>
        <Header
          text={`my bookmarks page`}
          styles={`text-2xl text-center my-5 capitalize`}
        />
        <section className='grid lg:grid-cols-3 max-w-[800px] m-auto gap-4 '>
          {bookmarks.map((bookmark) => {
            const { product } = bookmark
            return (
              // use grid on parent instead of t/r/b/l = 0 on overlay div
              <div
                key={bookmark.id}
                className='shadow-2xl h-90 grid overflow-hidden relative rounded-2xl hover'
              >
                <img
                  className='w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0 rounded-2xl'
                  src={product.images[0]?.image_url}
                  alt={product.name}
                />

                <div className='z-4 bg-gray-600/35 rounded-2xl flex justify-center items-end'>
                  <div className='p-5 text-center'>
                    <h2 className='text-white font-[500] text-[1.2rem]'>
                      {product.name}
                    </h2>
                  </div>
                </div>
                <div className='z-5 absolute top-0 w-full flex justify-end p-1'>
                  <BookmarkRemoveButton bookmark={bookmark} />
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}

export default UserBookmarksPage
