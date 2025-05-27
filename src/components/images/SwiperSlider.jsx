// Import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay' // Import autoplay styles

import products from '../../data/products'

export default () => {
  return (
    <Swiper
      // install Swiper modules - add Autoplay to the list
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}

      // Add autoplay configuration
      autoplay={{
        delay: 3000, // Delay between transitions (in ms)
        disableOnInteraction: false, // Continue autoplay after user interaction
        pauseOnMouseEnter: true, // Optional: pause on mouse hover
      }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}

      // Define responsive breakpoints
      breakpoints={{
        // When window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // When window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // When window width is >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        // When window width is >= 1280px
        1280: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
    >
      {products?.slice(0, 6).map((product, index) => {
        return (
          <SwiperSlide key={product.id || index}>
            <img
              className='h-[300px] w-full object-cover rounded-2xl'
              src={product.imageUrl}
              alt={product.name || ''}
            />
            <div className='swiper-pagination border'></div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
