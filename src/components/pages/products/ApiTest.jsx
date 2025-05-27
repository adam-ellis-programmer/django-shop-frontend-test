import React, { useState } from 'react'

const ApiTest = () => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Data to send to the API
  const dataToSend = {
    name: 'John Doe',
    email: 'john@gmail.com',
    msg: 'hey there how are you !!',
    some_key: 'some_value',
    test: 'this is a test',
  }
  // ========================================================================
  // Handle FormData request
  // ========================================================================

  const handleFormDataClick = async () => {
    console.log('Sending FormData request...')
    setLoading(true)
    setError(null)

    try {
      // Get the CSRF token from cookie
      const csrfToken =
        document.cookie
          .split(';')
          .find((cookie) => cookie.trim().startsWith('csrftoken='))
          ?.split('=')[1] || ''

      console.log('Using CSRF token:', csrfToken)

      // Create FormData
      const formData = new FormData()

      // Add each field individually to the FormData
      Object.entries(dataToSend).forEach(([key, value]) => {
        formData.append(key, value)
        console.log(`Adding to FormData: ${key}=${value}`)
      })

      // Send the request - use the full URL
      const response = await fetch('/api/test/protected/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('Response:', data)
      setResponse(data)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // =====================================================================================
  // Handle JSON request
  // =====================================================================================
  const handleJsonClick = async () => {
    console.log('Sending JSON request...')
    setLoading(true)
    setError(null)

    try {
      // Get the CSRF token from cookie
      const csrfToken =
        document.cookie
          .split(';')
          .find((cookie) => cookie.trim().startsWith('csrftoken='))
          ?.split('=')[1] || ''

      console.log('Using CSRF token:', csrfToken)
      console.log('Sending data:', dataToSend)

      // Send the request
      const response = await fetch('/api/test/protected/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('Response:', data)
      setResponse(data)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>API Test</h2>

      <div className='mb-4 p-3 bg-gray-100 rounded'>
        <h3 className='font-bold mb-2'>Data Being Sent:</h3>
        <pre className='text-xs overflow-auto'>
          {JSON.stringify(dataToSend, null, 2)}
        </pre>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4'>
        <div className='p-3 border rounded'>
          <h3 className='font-bold mb-2'>FormData Approach</h3>
          <button
            onClick={handleFormDataClick}
            className='btn btn-primary w-full'
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Test with FormData'}
          </button>
        </div>

        <div className='p-3 border rounded'>
          <h3 className='font-bold mb-2'>JSON Approach</h3>
          <button
            onClick={handleJsonClick}
            className='btn btn-secondary w-full'
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Test with JSON'}
          </button>
        </div>
      </div>

      {/* Display error if any */}
      {error && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded'>
          Error: {error}
        </div>
      )}

      {/* Display the response data */}
      {response && (
        <div className='mt-4 p-3 bg-green-100 rounded'>
          <h3 className='font-bold'>Response:</h3>
          <pre className='mt-2 bg-gray-800 text-white p-2 rounded overflow-auto'>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ApiTest
