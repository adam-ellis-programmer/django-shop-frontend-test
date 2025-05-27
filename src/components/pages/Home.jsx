import React, { useEffect, useState } from 'react'

import SwiperSlider from '../images/SwiperSlider'
import FeaturedProduct from '../images/FeaturedProduct'
import products from '../../data/products'
import ProductCard from '../images/ProductCard'
import Hero from '../images/Hero'
import Header from '../Headings/Header'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../testing/fetch'
import {
  fetchPublicProducts,
  selectProductsLoading,
  selectPublicProducts,
} from '../../features/products/productsSlice'

import ApiTest from './products/ApiTest'
import MainSpinner from '../spinners/MainSpinner'
import { topCategories } from '../../data/dataArrays'

const Home = () => {
  const isLoadingProducts = useSelector(selectProductsLoading)

  const dispatch = useDispatch()
  const reduxProducts = useSelector(selectPublicProducts) || []

  const filtered = reduxProducts.reduce((acc, item) => {
    // console.log(item.category)
    if (!acc.includes(item.category)) {
      acc.push(item.category)
    }
    return acc
  }, [])

  // console.log(filtered)

  useEffect(() => {
    scrollTo({
      top: 0,
    })

    dispatch(fetchPublicProducts())
    // .then((data) => console.log(data))
    return () => {}
  }, [])

  const [items, setItems] = useState([])

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem])
  }

  // console.log(reduxProducts)

  return (
    <div className='align-element m-h app'>
      {/* <ApiTest /> */}
      <section className='mb-8'>
        <Hero />
      </section>
      <Header text={`trending products`} styles={`mb-8 text-center text-3xl`} />
      <SwiperSlider />
      {isLoadingProducts ? (
        <MainSpinner extraStyles={`my-20 `} />
      ) : (
        <div>
          <Header
            text={`special offers`}
            styles={` mt-8 text-center text-3xl`}
          />
          <section className='grid md:grid-cols-2 gap-6 mt-7'>
            {reduxProducts &&
              reduxProducts
                ?.filter((item) => item.featured === true)
                .slice(0, 2)
                .map((product) => {
                  return <FeaturedProduct key={product.id} prod={product} />
                })}
          </section>

          <Header text={`worth a look`} styles={` mt-8 text-center text-3xl`} />

          <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-5 '>
            {reduxProducts && reduxProducts.length > 0 ? (
              [...reduxProducts]
                .reverse()
                .slice(0, 3)
                .map((product) => {
                  return <ProductCard key={product.id} prod={product} />
                })
            ) : (
              <p>No products available</p>
            )}
          </section>
        </div>
      )}
      <section className='mb-10'>
        <Header
          text={`top categories`}
          styles={` mt-8 text-center text-3xl mb-8`}
        />

        <div className='grid md:grid-cols-3 gap-4'>
          {topCategories.map((item, i) => {
            return (
              <div
                key={i}
                className=' h-[300px] overflow-hidde shadow-2xl relative hover'
              >
                <img
                  className='h-[300px] w-full object-cover rounded-2xl'
                  src={item.img}
                  alt=''
                />
                <div className='absolute top-[50%] w-full flex justify-center'>
                  <p>
                    <span className='text-2xl bg-rose-500 p-2 text-white lowercase rounded'>
                      {item.cat}
                    </span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Home
