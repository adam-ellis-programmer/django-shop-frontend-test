import React, { useEffect } from 'react'
import {
  fetchPublicProducts,
  searchProducts,
  selectPublicProducts,
  selectSearchResults,
  selectProductsLoading,
  selectProductsError,
} from '../../features/products/productsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import SearchPageCard from '../images/SearchPageCard'
import PriceSlider from '../filters/PriceSlider'

const SearchPage = () => {
  // ===============================================================
  // ALL PROUDCTS
  // ===============================================================
  const products = useSelector(selectPublicProducts)
  // ===============================================================
  // SEARCH PRODUCTS
  // ===============================================================
  const searchResults = useSelector(selectSearchResults)

  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  // ===============================================================
  // HANDLE FETCH / SEARCH LOGIC FOR ALL CONNECTED SEARCH INPUTS
  // ===============================================================
  useEffect(() => {
    // Get query from URL if present
    const queryFromUrl = searchParams.get('q')

    // Handle based on URL parameters
    if (queryFromUrl) {
      // If there's a query in the URL, perform search
      dispatch(searchProducts(queryFromUrl))
    } else {
      // If no search param in URL, load all products
      // This handles both initial load and cleared searches
      dispatch(fetchPublicProducts())
    }
  }, [dispatch, searchParams])

  if (loading) {
    return (
      <section className='align-element m-h m-auto'>
        <div className='flex justify-center mt-10'>
          <span className='loading loading-spinner loading-lg'></span>
          <p className='ml-2'>Loading products...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='align-element m-h m-auto'>
        <div className='alert alert-error mt-10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </section>
    )
  }

  // Determine which products to display based on URL parameter
  const queryParam = searchParams.get('q')
  const displayProducts = queryParam ? searchResults : products

  console.log(queryParam)

  return (
    <section className='align-element m-h m-auto'>
      <div className=' flex items-center'>
        <h1 className='text-2xl font-bold mt-10 mb-4'>
          {queryParam
            ? displayProducts.length > 0
              ? `Search Results for "${queryParam}" (${displayProducts.length} products found)`
              : `No results found for "${queryParam}"`
            : 'All Products'}
        </h1>
        {/* <div><PriceSlider /></div> */}
      </div>
      {displayProducts.length > 0 ? (
        <div className='mt-10 grid lg:grid-cols-3 gap-5'>
          {displayProducts.map((product, i) => {
            // Add null check to prevent errors
            if (!product) return null

            // Create a copy of the product to avoid modifying the original state
            const productCopy = { ...product }

            // If the product has a single 'image' property but no 'images' array,
            // create a compatible structure for the SearchPageCard component
            if (
              productCopy.image &&
              (!productCopy.images || !productCopy.images.length)
            ) {
              productCopy.images = [{ image: productCopy.image }]
            }

            return <SearchPageCard key={i} product={productCopy} />
          })}
        </div>
      ) : (
        // else ...
        <div className='text-center py-8'>
          <p className='text-lg mb-4'>
            {queryParam
              ? 'No products match your search criteria.'
              : 'No products available.'}
          </p>

          {queryParam && (
            <p>Try using different keywords or browse our categories.</p>
          )}
        </div>
      )}
    </section>
  )
}

export default SearchPage
