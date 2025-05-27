import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NavSearch = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchInputRef = useRef()
  // Add this line to define debounceTimerRef
  const debounceTimerRef = useRef(null)

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
    navigate(`/search?q=${encodeURIComponent(query.trim())}`, {
      replace: true,
    })
  }

  // ===============================================================
  // CREATE A DEBOUNCED VERSION OF THE SEARCH FUNCTION HERE
  // ===============================================================
  const debouncedSearch = debounce(searchLogic, 1000)

  // ===============================================================
  // HANDLE EVENT TRIGGERS
  // ===============================================================
  const handleDebounceSearch = (e) => {
    const newQuery = e.target.value
    debouncedSearch(newQuery)
  }

  // ===============================================================
  // Handle Submit (Enter press)  -- not in use for now
  // ===============================================================
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // ===============================================================
  //  CMD + K KEYBOARD SHORTCUT FUNCTIONALITY
  // ===============================================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search input when user presses Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      // REMOVE EVENT LISTENERS -- CLEANUP 
      document.removeEventListener('keydown', handleKeyDown)
      // Clear any pending debounce timers on unmount
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <div className='flex-1 hidden lg:block dark-border '>
      <form onSubmit={handleSubmit}>
        <label className='input border w-full search-input'>
          <svg
            className='h-[1em] opacity-50 '
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
            // ref for the CMD + K short cut
            ref={searchInputRef}
            onChange={handleDebounceSearch}
            type='search'
            className='grow search-input'
            placeholder='Search'
          />
          <kbd className='kbd kbd-sm search-input'>⌘</kbd>
          <kbd className='kbd kbd-sm search-input'>K</kbd>
        </label>
      </form>
    </div>
  )
}

export default NavSearch