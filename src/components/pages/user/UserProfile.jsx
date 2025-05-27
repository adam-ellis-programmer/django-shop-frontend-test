import { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Headings/Header'
import {
  fetchUser,
  updateUser,
  selectUserData,
  selectUserLoading,
  selectUserError,
  selectUserSuccess,
  resetUserSuccess,
} from '../../../features/user/updateUserSlice'
import { toast } from 'react-toastify' // Assuming you use react-toastify for notifications
import MainSpinner from '../../spinners/MainSpinner'
import { selectUser } from '../../../features/user/userSlice'
import useTestUserCheck from '../../../hooks/useTestUserCheck'

const UserProfile = () => {
  const { checkTestUser } = useTestUserCheck()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(selectUser)
  const loading = useSelector(selectUserLoading)
  const error = useSelector(selectUserError)
  const success = useSelector(selectUserSuccess)
  // Editable form state
  const [formData, setFormData] = useState({})

  // List of fields that should be displayed as checkboxes
  const booleanFields = ['is_active']

  // id from state (set at login / signup)
  const currentUserId = userData?.id

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(fetchUser(currentUserId))
  }, [dispatch, currentUserId])

  useEffect(() => {
    // Update form data when userData changes
    if (userData) {
      setFormData(userData)
    }
  }, [userData])

  useEffect(() => {
    // Show toast notification when update is successful
    if (success) {
      toast.success('User profile updated successfully!')
      dispatch(resetUserSuccess())
    }
  }, [success, dispatch])

  useEffect(() => {
    // Show error notification
    if (error) {
      toast.error(`Error: ${error}`)
    }
  }, [error])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    // Handle checkbox inputs differently
    const inputValue = type === 'checkbox' ? checked : value

    setFormData({
      ...formData,
      [name]: inputValue,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (checkTestUser()) return
    dispatch(
      updateUser({
        userId: currentUserId,
        userData: formData,
      })
    )
  }

  // Fields to hide from the form
  const hiddenFields = [
    'id',
    'customer_id',
    'created_at',
    'updated_at',
    'date_joined',
    'customer',
  ]

  if (loading && !userData) {
    return (
      <div className='flex justify-center p-10 m-h'>
        <MainSpinner />
      </div>
    )
  }

  return (
    <div className='align-element m-h'>
      <Header
        text={`manage your account`}
        styles={`text-center text-2xl capitalize mt-8`}
      />
      <section className='grid lg:grid-cols-2'>
        <div className='p-10'>
          <div className='grid lg:grid-cols-3 gap-3'>
            <Link className='' to={`/my-listings`}>
              <button className='btn btn-outline w-full'>
                Manage Listings{' '}
                <i className='fa-solid fa-table text-[1.5rem]'></i>
              </button>
            </Link>

            <Link to={`/add-product`}>
              <button className='btn btn-outline w-full'>
                New Product <i className='fa-solid fa-square-plus text-2xl'></i>
              </button>
            </Link>
            <Link to={`/my-bookmarks`}>
              <button className='btn btn-outline w-full'>
                My Bookmarks{' '}
                <i className='fa-solid fa-bookmark text-[1.5rem]'></i>
              </button>
            </Link>
            <Link to={`/my-orders`}>
              <button className='btn btn-outline w-full'>
                My Orders{' '}
                <i className='fa-regular fa-credit-card text-[1.5rem]'></i>
              </button>
            </Link>
            <Link to={`/my-comments`}>
              <button className='btn btn-outline w-full'>
                My Comments{' '}
                <i className='fa-regular fa-comment-dots text-[1.5rem]'></i>
              </button>
            </Link>
          </div>
        </div>

        <div className='p-10'>
          <Form className='' onSubmit={handleSubmit}>
            <ul className='grid lg:grid-cols-2 gap-3'>
              {userData &&
                Object.entries(userData).map(([key, value], i) => {
                  // Skip fields that shouldn't be displayed/edited
                  if (hiddenFields.includes(key)) {
                    return null
                  }

                  // Check if this is a boolean field
                  const isBoolean = booleanFields.includes(key)

                  return (
                    <li key={i} className=''>
                      <label
                        className='block mb-1 mt-4 capitalize'
                        htmlFor={key}
                      >
                        {key.replace(/_/g, ' ')}
                      </label>

                      {isBoolean ? (
                        <div className='form-control'>
                          <label className='cursor-pointer label justify-start gap-2'>
                            <input
                              type='checkbox'
                              name={key}
                              checked={formData[key] || false}
                              onChange={handleInputChange}
                              className='checkbox checkbox-primary'
                            />
                            <span className='label-text'>
                              {formData[key] ? 'Active' : 'Inactive'}
                            </span>
                          </label>
                        </div>
                      ) : (
                        <input
                          type='text'
                          placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                          className='input input-neutral w-full'
                          value={formData[key] || ''}
                          onChange={handleInputChange}
                          name={key}
                        />
                      )}
                    </li>
                  )
                })}
            </ul>
            <div className='flex justify-end mt-5'>
              <button type='submit' className='btn btn-dash' disabled={loading}>
                {loading ? 'Updating...' : 'Update details'}
              </button>
            </div>
          </Form>
        </div>
      </section>
      <div className='w-full h-[1px] bg-amber-500 mt-5'></div>
    </div>
  )
}

export default UserProfile
