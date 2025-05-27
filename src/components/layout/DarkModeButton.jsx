import React, { useState, useEffect } from 'react'

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // On component mount, check localStorage for saved theme preference
  useEffect(() => {
    // Check if there's a saved preference in localStorage
    const savedTheme = localStorage.getItem('darkMode')

    // If there is a saved preference, use it
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'true')
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      console.log(prefersDark)
      setIsDarkMode(prefersDark)
      localStorage.setItem('darkMode', prefersDark.toString())
    }

    // Apply the theme
    applyTheme(savedTheme === 'true')
  }, [])

  // Function to apply theme to document
  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleToggle = () => {
    // Toggle the dark mode state
    const newDarkModeState = !isDarkMode

    // Update state
    setIsDarkMode(newDarkModeState)

    // Save to localStorage
    localStorage.setItem('darkMode', newDarkModeState.toString())

    // Apply the theme
    applyTheme(newDarkModeState)
  }

  return (
    <div className='md:mr-5'>
      <button
        onClick={handleToggle}
        className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <i
          className={`fa-solid fa-circle-half-stroke text-2xl cursor-pointer ${
            isDarkMode ? 'text-yellow-300' : 'text-gray-700'
          }`}
        ></i>
      </button>
    </div>
  )
}

export default DarkModeButton
