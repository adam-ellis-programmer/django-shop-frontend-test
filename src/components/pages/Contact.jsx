import React from 'react'
import ContactForm from '../forms/ContactForm'

import products from '../../data/products'
import Header from '../Headings/Header'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
const Contact = () => {
  return (
    <div className='m-h'>
      <section className=' max-w-[90%] m-auto grid grid-cols-1 md:grid-cols-2'>
        <div className=''>
          <Header
            text={`We Make Shopping Easier!`}
            styles={`text-center text-2xl my-5`}
          />
          <div className='grid lg:grid-cols-3   gap-3'>
            {[...products]
              .reverse()
              .slice(0, 3)
              .map((item, i) => {
                return (
                  <img
                    key={i}
                    className='w-full h-[200px] rounded-2xl object-cover shadow-2xl hover'
                    src={item.imageUrl}
                    alt=''
                  />
                )
              })}
          </div>
          <div className=' mt-20'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            consequuntur repudiandae quisquam quod numquam nisi accusamus ipsam
            ipsa, fugiat asperiores vel quidem est, officiis voluptate! Harum
            nobis quibusdam non in voluptates, adipisci similique, at
            necessitatibus odio architecto cupiditate perspiciatis, blanditiis
            sint numquam et sed odit reiciendis sequi ex ad? Vero.
          </div>

          <div className='flex justify-end'>
            <Link to={`/search`}>
              <button className='btn btn-dash btn-secondary w-[200px] mt-10'>
                <span className='mr-5'>take me shopping</span> <ShoppingBag />
              </button>
            </Link>
          </div>

          <div className='grid grid-cols-2 lg:grid-cols-6 gap-5  mt-10'>
            {[...products].slice(0, 6).map((item, i) => {
              return (
                <img
                  key={i}
                  className='w-full sm:h-[100px] h-[200px] rounded-2xl object-cover shadow-2xl hover'
                  src={item.imageUrl}
                  alt=''
                />
              )
            })}
          </div>
        </div>
        <div className=''>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

export default Contact
