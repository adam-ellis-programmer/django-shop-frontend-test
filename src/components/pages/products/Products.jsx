import React, { useEffect, useState } from 'react'
import SectionTitle from '../../layout/SectionTitle'
import ProductCard from '../../images/ProductCard'
import PriceSlider from '../../filters/PriceSlider'
import Paginate from '../../pagination/Paginate'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import {
  fetchPublicProducts,
  selectPublicProducts,
  selectProductsLoading,
  selectProductsError,
  selectPagination, // Add this selector
} from '../../../features/products/productsSlice'
import CategoryFilter from '../../filters/CategoryFilter'
import MainSpinner from '../../spinners/MainSpinner'

const Products = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Get current page from URL params
  const currentPage = parseInt(searchParams.get('page')) || 1
  const pageSize = 9 // Set your desired page size

  // Get data from Redux
  const reduxProducts = useSelector(selectPublicProducts) || []
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const pagination = useSelector(selectPagination) // Get pagination info
  // console.log('pagination====>', pagination)

  // Fetch products when page changes
  useEffect(() => {
    scrollTo({ top: 0 })
    // Pass current page and page size to the fetch action
    dispatch(
      fetchPublicProducts({
        page: currentPage,
        pageSize: pageSize,
      })
    )
  }, [dispatch, currentPage, pageSize])

  // Handle page change
  const handlePageChange = (newPage) => {
    // Update URL with new page
    navigate(`/products?page=${newPage}`)
  }

  return (
    <div className='align-element mb-5'>
      <div className='m-h grid sm:grid-cols-1 lg:grid-cols-[250px_1fr]'>
        {/* filters */}
        <section className='hidden lg:block'>
          <SectionTitle text={`filters`} />
          <PriceSlider />
          <CategoryFilter products={reduxProducts} />
        </section>

        {/* products */}
        <section className=''>
          {/* Display error if any */}
          {error && (
            <div className='text-red-500 mt-8 p-4 bg-red-50 rounded-lg border border-red-200'>
              Error: {error}
            </div>
          )}

          {/* Display products */}
          {loading ? (
            <MainSpinner extraStyles={`mt-30`} />
          ) : (
            <>
              <SectionTitle text={`browse our products`} />
              <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-5'>
                {reduxProducts &&
                  reduxProducts.length > 0 &&
                  reduxProducts.map((i, index) => (
                    <ProductCard key={i.id || index} prod={i} />
                  ))}
              </div>
            </>
          )}
        </section>
      </div>

      {/* Working pagination component */}
      {pagination && (
        <Paginate
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Products
