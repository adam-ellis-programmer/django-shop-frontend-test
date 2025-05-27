import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const MobileSearch = () => {
  const navigate = useNavigate()
  const [queryTerm, setQueryTerm] = useState('')
  // ===============================================================
  // DEBOUNCE FUNCTION
  // ===============================================================
  function debounce(func, delay) {
    let timeout
    return function (...args) {
      // console.log('args---->', ...args)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  // ===============================================================
  // FUNC TO BE DEBOUNCE -- (SEARCH LOGIC HERE)
  // ===============================================================
  function searchLogic(query) {
    console.log('Searching for:', query)
    // Your actual search logic here (API calls, etc.)
  }

  // ===============================================================
  // CREATE A DEBOUNCED VERSION OF THE SEARCH FUNCTION HERE
  // ===============================================================
  const debouncedSearch = debounce(searchLogic, 1000)

  // ===============================================================
  // HANDLE EVENT TRIGGERS
  // ===============================================================
  const handleSearch = (e) => {
    // const searchValue = e.target.value
    // debouncedSearch(searchValue)
    setQueryTerm(e.target.value)
  }

  // ===============================================================
  // HANDLE SUBMIT
  // ===============================================================
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('QUERY---->', queryTerm)
    navigate(`/search?q=${encodeURIComponent(queryTerm.trim())}`, {
      replace: true,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='md:hidden px-8 mt-3 search-input'>
        <label className='input w-full search-input dark-border'>
          <svg
            className='h-[1em] opacity-50 search-input'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <input
            onChange={handleSearch}
            type='search'
            className='grow search-input'
            placeholder='Search'
            // name='search'
          />
        </label>
      </div>
    </form>
  )
}

export default MobileSearch
