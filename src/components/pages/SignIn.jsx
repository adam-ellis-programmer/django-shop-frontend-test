import React, { useEffect } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHeader } from '../index'
import img from '../../place holders/test-w.png'

import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from '../../features/user/userSlice'
import products from '../../data/products'

const inputs = [
  {
    id: 'email',
    placeholder: 'email',
    name: 'email',
    type: 'email',
    defaultValue: 'john@gmail.com',
  },
  {
    id: 'password',
    placeholder: 'password',
    name: 'password',
    type: 'password',
    defaultValue: 'Thisisasecret',
  },
]

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)
  const isLoading = status === 'loading'

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  // Redirect on successful login
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/')
    }
  }, [status, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    // get data from form
    const formData = new FormData(e.target)

    // set credentials
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    // dispatch credentials
    dispatch(loginUser(credentials))
  }

  const handleTestUser = () => {
    const credentials = {
      email: 'test-user@easy-store.com',
      password: 'secret',
    }
    dispatch(loginUser(credentials))
    console.log('hello and logging in....', credentials)
  }

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center py-12'>
      {/* Background Image */}
      <img
        className='absolute top-0 left-0 w-full h-full object-cover -z-10'
        src={`https://images.pexels.com/photos/30791857/pexels-photo-30791857/free-photo-of-aerial-view-of-tropical-beach-and-boats-in-papua.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
        alt='Background'
      />

      {/* Form Container */}
      <div className='w-full max-w-[900px] px-4'>
        <div className='bg-gray-100/30 rounded-lg backdrop-blur-sm relative'>
          <img className='h-[30px] absolute top-5 right-5' src={img} alt='' />

          <Form onSubmit={handleSubmit} className='shadow-2xl p-10 md:p-12'>
            <FormHeader text='Sign In ' />
            {error && <div className='alert alert-error mb-4'>{error}</div>}

            {inputs.map(({ id, placeholder, name, type, defaultValue }) => {
              return (
                <input
                  key={id}
                  type={type}
                  placeholder={placeholder}
                  className='input input-md w-full cursor-default mb-[1px]'
                  name={name}
                  id={id}
                  required
                  defaultValue={defaultValue}
                />
              )
            })}
            <div className='flex justify-between mb-4 font-extrabold mt-2'>
              <Link to={`/sign-up`}>Sign Up</Link>
              <Link to={`/`}>Back to browse</Link>
            </div>

            <div className='flex items-end'>
              <button
                className='btn btn-neutral'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Submit'}
              </button>
              <button
                onClick={handleTestUser}
                className='btn btn-neutral ml-10'
                type='button'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Test Drive'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
