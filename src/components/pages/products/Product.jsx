import React, { useEffect, useState } from 'react'

import Header from '../../Headings/Header'
import { Link, useParams } from 'react-router-dom'
import RelatedProduct from '../../images/RelatedProduct'
import ProductComments from './ProductComments'
import { getData } from '../../../testing/fetch'
import AdvertCard from '../../images/AdvertCard'
import AddToCartButton from '../../images/AddToCartButton'
import { useSelector, useDispatch } from 'react-redux'
import { selectSuccess } from '../../../features/cart/cartSlice'
import {
  fetchProductById,
  fetchPublicProducts,
  selectCurrentProduct,
  selectProductsLoading,
  selectPublicProducts,
} from '../../../features/products/productsSlice'
import GenericAlert from '../../alerts/GenericAlert'
import ProductSkeleton from '../../images/ProductSleleton'
import { formatGBP } from '../../../utils/helperUtils'

// hydration what is hydration
const Product = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const productLoading = useSelector(selectProductsLoading)

  const productData = useSelector(selectCurrentProduct)
  const products = useSelector(selectPublicProducts)

  const addedToCartSuccess = useSelector(selectSuccess)

  // console.log(prod)
  useEffect(() => {
    scrollTo({
      top: 0,
    })

    return () => {}
  }, [id])

  useEffect(() => {
    dispatch(fetchProductById(id))
    dispatch(fetchPublicProducts())
    // .unwrap()
    // .then((data) => console.log(data))
    return () => {}
  }, [id])
  // console.log(dummyArray)

  if (productLoading) return <ProductSkeleton />

  return (
    <div className=' mb-10'>
      {addedToCartSuccess && (
        <GenericAlert
          text={'success! item added to cart '}
          styles={`alert alert-info max-w-[80%] m-auto text-white text-2xl mt-3`}
        />
      )}
      <div className='flex flex-col md:flex-row justify-center   mt-5  max-w-[90%] mx-auto '>
        <Link to={`/products`}>
          <button className='btn btn-outline btn-primary w-full md:w-[200px] mr-5 mb-1 dark-btn-1'>
            Back Shopping
          </button>
        </Link>
        <Link to={`/cart`}>
          <button className='btn btn-outline btn-primary w-full md:w-[200px] dark-btn-1'>
            To My Cart
          </button>
        </Link>
      </div>
      <div className='max-w-[90%] mx-auto m-h  grid  lg:grid-cols-[1fr_1fr] gap-5 '>
        <div className=' md:pr-5  h-fit '>
          <div className='mb-30'>
            <Header
              text={`product details`}
              styles={`text-3xl mt-7 text-center`}
            />
            <div className='flex justify-center mb-8'>
              <div className='badge badge-info  text-white'>Overview</div>
            </div>
            {/* main card */}
            <div className='shadow-[1px_2px_15px_#ccc] p-5 md:p-10  rounded-[8px] hover dark-box-shadow-1 '>
              <div className='flex justify-end '>
                <div className='badge badge-success text-white text-[2rem] p-5'>
                  {formatGBP(productData?.price)}
                </div>
              </div>
              {/* top sec */}
              <div>
                <p className='text-center mb-5 text-2xl'>
                  {' '}
                  {productData?.name}
                </p>
                <p className=' max-w-1/2 m-auto mb-5'>
                  {productData?.description}
                </p>
                <div className='gap-6 md:grid  lg:grid-cols-2'>
                  <div>
                    <img
                      className='w-full md:w-full rounded  h-[300px] object-cover shadow-[1px_1px_20px_rgba(0,0,0,0.2)] p-3'
                      src={productData?.images[0]?.image_url}
                      alt=''
                    />

                    <div className=' grid grid-cols-2 my-5 gap-3 shadow-[1px_1px_20px_rgba(0,0,0,0.2)] p-1 rounded-2xl'>
                      {productData?.images &&
                        productData?.images?.length > 1 &&
                        productData?.images?.map((item, i) => {
                          return (
                            <img
                              key={i}
                              className='rounded-md h-[100px] w-full object-cover'
                              src={item?.image_url}
                              alt=''
                            />
                          )
                        })}
                    </div>

                    <ul className=''>
                      <h3 className='text-2xl mb-2 '>product tags</h3>
                      {productData?.tags.split(',').map((i) => {
                        return (
                          <li key={i} className='mb-2'>
                            <div className='badge badge-neutral '>{i}</div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div>
                    {/*  */}

                    <ul className=''>
                      {productData?.bullet_points.map((item, i) => {
                        // console.log(item)
                        return (
                          <li className='' key={i}>
                            <div className='flex mb-5'>
                              <i className='fa-solid fa-circle-info block mt-1'></i>
                              <p className='ml-5'> {item.text}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className='flex justify-end'>
                {/* USE TRY CATCH TO DISPLAY THE ERROR CANNOT HAVE 0 ITEMS ADDDED  */}
                <AddToCartButton product={productData} />
              </div>

              <p className='p-7 leading-9'>
                {productData?.detailedDescription}
              </p>
              {/* ... */}
              {/* ... */}
              {/* ... */}
            </div>
          </div>

          <ul>
            <ProductComments />
          </ul>
        </div>
        {/* right side of grid */}
        <div className=' grid lg:grid-cols-[70%_30%]'>
          <div>
            <Header
              text={`Related Products`}
              styles={`text-3xl text-center mt-7`}
            />
            <div className='flex justify-center'>
              <div className='badge badge-secondary '>In Electronics</div>
            </div>
            {/* ... */}
            <div className='mt-7'>
              {/* KEEP UNTIL WE HAVE DATA TO DISPLAY RELATED PRODUCTS  */}
              {products.slice(0, 4).map((i, index) => {
                // console.log(i)
                return <RelatedProduct key={index} product={i} />
              })}
            </div>
          </div>
          {/* ... */}
          <div className=' p-3 ml-5'>
            <Header text={`quick deals`} styles={`text-center text-2xl my-5`} />

            {products &&
              products
                .slice(0, 5)
                .reverse()
                .map((item, i) => {
                  return <AdvertCard key={i} item={item} />
                })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
