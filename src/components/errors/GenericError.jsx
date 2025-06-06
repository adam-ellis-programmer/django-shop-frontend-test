// src/components/GenericError.jsx
import { useRouteError, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const GenericError = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(error)
    // Log the full error for debugging
    // console.error('Route Error:', error)
    // console.error('Error Stack:', error?.stack)
    // console.error('Error Message:', error?.message)
  }, [error])

  const handleGoHome = () => {
    navigate('/', { replace: true })
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <div className='text-center'>
            <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
              <svg
                className='h-6 w-6 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>

            <h2 className='mt-6 text-2xl font-extrabold text-gray-900'>
              Oops! Something went wrong
            </h2>

            <p className='mt-2 text-sm text-gray-600'>
              {error?.status === 404
                ? "The page you're looking for doesn't exist."
                : "We're sorry, but there was an error loading this page."}
            </p>

            {/* Show error details in development */}
            {import.meta.env.DEV && error && (
              <div className='mt-4 p-3 bg-red-50 rounded-md text-left'>
                <p className='text-sm font-medium text-red-800'>
                  Development Error Details:
                </p>
                <pre className='mt-1 text-xs text-red-700 overflow-auto'>
                  {error.message || error.statusText || 'Unknown error'}
                </pre>
              </div>
            )}

            <div className='mt-6 flex flex-col sm:flex-row gap-3'>
              <button
                onClick={handleRefresh}
                className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Try Again
              </button>

              <button
                onClick={handleGoHome}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenericError
