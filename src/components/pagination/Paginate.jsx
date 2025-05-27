import React from 'react'

const Paginate = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render if no pagination data
  if (!totalPages || totalPages <= 1) {
    return null
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5 // Maximum number of page buttons to show

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className='w-full flex items-center justify-center p-5'>
      <div className='join'>
        {/* Previous button */}
        <button
          className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`join-item btn ${
              currentPage === page ? 'btn-active' : ''
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          className={`join-item btn ${
            currentPage === totalPages ? 'btn-disabled' : ''
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>

      {/* Optional: Show current page info */}
      <div className='ml-4 text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

export default Paginate
