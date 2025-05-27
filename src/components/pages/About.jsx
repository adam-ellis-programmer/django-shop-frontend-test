import React from 'react'
import Header from '../Headings/Header'
import aboutData from '../../data/aboutData'
import products from '../../data/products'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='align-element m-h'>
      <Header
        text={`Welcome to easy store `}
        styles={`text-2xl text-center my-10 capitalize`}
      />
      <section className='grid lg:grid-cols-2 min-h-[80vh]'>
        <div className=''>
          <Header
            text={`Here to help you shop`}
            styles={`text-2xl text-center capitalize `}
          />

          <div className='grid lg:grid-cols-2 gap-5 p-5  mt-6'>
            {[...products].slice(5,7).map((item, i) => {
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

          <div className='flex justify-end p-8'>
            <Link to={`/search`}>
              <button className='btn btn-dash btn-secondary w-[200px]'>
                <span className='mr-5'>take me shopping</span> <ShoppingBag />
              </button>
            </Link>
          </div>

          <p className=' max-w-[700px] m-auto mt-4 bg-gray-200 p-5 rounded hover '>
            Navigating the digital marketplace has transformed the way we shop.
            Our intuitive platform offers a seamless browsing experience, with
            carefully curated collections for every taste and budget. From the
            moment you land on our homepage, personalized recommendations guide
            your journey through thousands of high-quality products. <br />
            <br />
            Our streamlined checkout process eliminates frustration, while
            secure payment options protect your sensitive information. <br />
            <br />
            Detailed product descriptions, authentic customer reviews, and
            high-resolution images help you make confident purchasing decisions
            without seeing items in person. The convenience of 24/7 availability
            means you can shop at midnight in your pajamas or during your lunch
            break. <br />
            <br />
            Free shipping thresholds encourage larger purchases, while our
            loyalty program rewards returning customers with exclusive discounts
            and early access to sales. Our responsive customer service team
            stands ready to assist with any questions or concerns, ensuring your
            satisfaction from browsing to unboxing.
          </p>
        </div>
        <div className=' '>
          <Header
            text={`About Our Company`}
            styles={`text-2xl text-center mb-10 capitalize`}
          />

          {/* render cards */}
          <div className='grid lg:grid-cols-2 gap-4 '>
            {aboutData
              .slice()
              .map(({ id, title, content, iconName: IconComponent }) => {
                console.log()
                return (
                  // main card
                  <div
                    key={id}
                    className=' min-h-[200px] shadow-[1px_2px_20px_rgb(0,0,0,0.1)] p-6 rounded-2xl hover'
                  >
                    {/* Render the icon component */}
                    <p>{IconComponent && <IconComponent size={24} />}</p>
                    <h2>{title}</h2>
                    <div className='mt-3'>
                      {/* if array render this  */}
                      {Array.isArray(content) && (
                        <ul>
                          {content.map((item, i) => {
                            return (
                              <li key={i} className=''>
                                <i className='fa-solid fa-circle-check mr-3 text-[#D9420B]'></i>{' '}
                                {item}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      {/* render if is string  */}
                      {typeof content === 'string' && <p>{content}</p>}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
