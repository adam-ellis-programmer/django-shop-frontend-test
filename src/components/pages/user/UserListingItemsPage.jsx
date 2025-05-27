import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../../Headings/Header'
import UserPrductItem from './UserPrductItem'
import { Link } from 'react-router-dom'
import {
  fetchCustomerProducts,
  selectCustomerProducts,
  selectProductsLoading,
  selectProductsError,
} from '../../../features/products/productsSlice'

const UserListingItemsPage = () => {
  const dispatch = useDispatch()

  // Get state from Redux
  const products = useSelector(selectCustomerProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  // Count active products (adapt this logic to your needs)
  const activeProducts = products.filter((p) => p.inStock && !p.suspend).length

  useEffect(() => {
    // Fetch products on component mount
    dispatch(fetchCustomerProducts())
  }, [dispatch])

  return (
    <div className='min-h-screen lg:w-[60%] mx-auto'>
      <Heading
        text={`Manage your product listings`}
        styles={`text-center text-3xl my-10`}
      />

      <div className='flex justify-center mb-5'>
        <Link to={`/add-product`}>
          <button className='btn btn-outline text-lg text-orange-500'>
            new product{' '}
            <i className='fa-solid fa-square-plus text-2xl text-orange-500'></i>
          </button>
        </Link>
      </div>

      <div className='flex justify-center'>
        <div className='badge badge-neutral badge-outline mr-5'>
          {products ? products.length : 0} Products
        </div>
        <div className='badge badge-neutral badge-dash'>
          {activeProducts} active
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center my-10'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : error ? (
        <div className='alert alert-error my-10'>{error}</div>
      ) : (
        <div className='mt-10 align-element '>
          {/* Table header - using grid with specific column widths */}
          <div className='hidden md:grid grid-cols-5 mb-1 py-2 font-medium'>
            <div className='text-center'>img</div>
            <div className='text-center'>product name</div>
            <div className='text-center'>buttons</div>
            <div className='text-center'>active</div>
            <div className='text-center'>sold</div>
          </div>

          {/* Table body */}
          <div className='mx-auto '>
            {products && products.length > 0 ? (
              products.map((product, i) => (
                <UserPrductItem key={product.id} product={product} i={i} />
              ))
            ) : (
              <div className='text-center py-10'>
                You don't have any products yet. Click "new product" to add one.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserListingItemsPage
