// src/routes/SignUp.jsx
import React, { useEffect } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHeader } from '../index'
import img from '../../place holders/test-w.png'
import {
  registerUser,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from '../../features/user/userSlice'

const inputs = [
  {
    id: 'first-name',
    placeholder: 'first name',
    name: 'firstName',
    type: 'text',
    defaultValue: 'John',
  },
  {
    id: 'last-name',
    placeholder: 'last name',
    name: 'lastName',
    type: 'text',
    defaultValue: 'Doe',
  },
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
  {
    id: 'confirm-password',
    placeholder: 'confirm password',
    name: 'confirm-password',
    type: 'password',
    defaultValue: 'Thisisasecret',
  },
]

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)
  const isLoading = status === 'loading'

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  // Redirect on successful registration
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/')
    }
  }, [status, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    }

    // Validate password match
    if (userData.password !== userData.confirmPassword) {
      // You could dispatch an action to set a custom error here
      // For simplicity, we'll just alert
      alert("Passwords don't match")
      return
    }

    dispatch(registerUser(userData))
  }

  return (
    <div className='relative  min-h-screen flex items-center justify-center'>
      <img
        className='absolute top-0 left-0 w-full h-full object-cover -z-10'
        src={`https://images.pexels.com/photos/30791857/pexels-photo-30791857/free-photo-of-aerial-view-of-tropical-beach-and-boats-in-papua.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
        alt='Background'
      />

      <div className='w-full max-w-[1000px] px-4'>
        <div className='bg-gray-100/30 rounded-lg backdrop-blur-sm p-10 relative'>
          <img className='h-[30px] absolute top-5 right-5' src={img} alt='' />

          <FormHeader text='Sign Up for your free account' />
          <Form onSubmit={handleSubmit}>
            {error && (
              <div className='alert alert-error mb-4'>
                {typeof error === 'object' ? JSON.stringify(error) : error}
              </div>
            )}

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
              <Link className='' to={`/sign-in`}>
                <p> Already have an account</p>
                <p> Sign In</p>
              </Link>
              <Link to={`/`}>Back to browse</Link>
            </div>

            {/* <div className='mb-5'>
              <fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4'>
                <legend className='fieldset-legend'>Login options</legend>
                <label className='label'>
                  <input type='checkbox' defaultChecked className='toggle' />
                  Join Mailing List
                </label>
              </fieldset>
            </div> */}

            <div className='flex items-end'>
              <button
                className='btn btn-neutral'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Submit'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
