import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../Headings/Header'
import DeleteItem from './DeleteItem'
import {
  fetchCustomerProductById,
  deleteCustomerProduct,
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
  selectDeleteSuccess,
  resetDeleteSuccess,
} from '../../../features/products/productsSlice'
import useTestUserCheck from '../../../hooks/useTestUserCheck'

const DeleteProductPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { isTestUser, checkTestUser } = useTestUserCheck()

  // Get state from Redux
  const product = useSelector(selectCurrentProduct)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const deleteSuccess = useSelector(selectDeleteSuccess)

  const goBack = () => {
    navigate(-1)
  }

  // Fetch product data
  useEffect(() => {
    dispatch(fetchCustomerProductById(id))
  }, [dispatch, id])

  // Navigate on successful deletion
  useEffect(() => {
    if (deleteSuccess) {
      dispatch(resetDeleteSuccess())
      navigate('/my-listings')
    }
  }, [deleteSuccess, navigate, dispatch])

  const handleDelete = async () => {
    // Check if user is a test user first
    // prettier-ignore
    if (checkTestUser('You cannot delete this product as you are a test user')) {
      return
    }

    if (!product) return

    if (!window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      return
    }

    // Dispatch delete action
    dispatch(deleteCustomerProduct(product.id))
  }

  if (loading && !product) {
    return <div className='text-center py-10'>Loading product details...</div>
  }

  if (error && !product) {
    return <div className='text-center py-10 text-red-500'>Error: {error}</div>
  }

  if (!product) {
    return <div className='text-center py-10'>Product not found</div>
  }

  return (
    <>
      <div className='max-w-[400px] mx-auto shadow-[1px_3px_18px_#ccc] rounded-2xl p-5 my-10'>
        <DeleteItem product={product} />
        <div className=''>
          <h3 className='text-center text-2xl bg-[#595959] p-5 text-white rounded-md'>
            <p className='my-1'>
              <i className='fa-solid fa-circle-exclamation text-[3rem]'></i>
            </p>
            <p className='my-1'>You are about to delete this product</p>
            <p className='my-1'>Do you want to continue?</p>
          </h3>
          <div className='flex justify-center mt-5'>
            <button
              onClick={goBack}
              className='w-100px btn btn-outline btn-primary mx-5 dark-btn-1'
              disabled={loading}
            >
              go back
            </button>
            <button
              onClick={handleDelete}
              className='w-100px btn btn-outline btn-secondary mx-5 dark-btn-1'
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'delete'}
            </button>
          </div>
          <p className='text-center mt-5'>
            <span className='badge badge-secondary'>
              This action cannot be undone
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default DeleteProductPage
