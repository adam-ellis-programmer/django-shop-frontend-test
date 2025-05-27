// src/components/pages/SearchByCategoryPage.jsx
import React, { useEffect, useState } from 'react'
import { categories } from '../../data/dataArrays'
import ProductCard from '../images/ProductCard'
import CategoryFilter from '../filters/CategoryFilter'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Headings/Header'
import { useSearchParams } from 'react-router-dom'
import {
  fetchProductsByCategory,
  selectFilteredProducts,
  selectFilterLoading,
  selectFilterError,
} from '../../features/filters/filtersSllice'

const SearchByCategoryPage = () => {
  const dispatch = useDispatch()
  let [searchParams] = useSearchParams()

  // Get data from Redux state
  const filteredProducts = useSelector(selectFilteredProducts) || []
  const isLoading = useSelector(selectFilterLoading)
  const error = useSelector(selectFilterError)

  useEffect(() => {
    // Get category from search params
    const category = searchParams.get('q')

    if (category) {
      // Dispatch action to fetch products by category
      dispatch(fetchProductsByCategory(category))
    }

    return () => {}
  }, [searchParams, dispatch])

  return (
    <div className='align-element'>
      <Header
        text={`Products in category: ${searchParams.get('q') || 'All'}`}
        styles={`my-5 text-center text-2xl capitalize`}
      />

      <section className='grid sm:grid-cols-1 lg:grid-cols-[250px_1fr]'>
        <div className=''>
          <CategoryFilter />
        </div>

        <div className=''>
          {isLoading ? (
            <p className='text-center'>Loading products...</p>
          ) : error ? (
            <p className='text-center text-red-500'>Error: {error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className='text-center'>No products found in this category</p>
          ) : (
            <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-5'>
              {filteredProducts.map((item, index) => (
                <ProductCard key={item.id || index} prod={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default SearchByCategoryPage
