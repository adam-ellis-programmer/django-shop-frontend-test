import React, { useEffect, useState } from 'react'
import { NavLinks } from './NavLinks'
import { Link } from 'react-router-dom'
import NavSearch from '../filters/NavSearch'
import MobileNav from './MobileNav'
import { CartLink } from '../index' // Change this line to use named import
import { fetchCart, selectCartItemCount } from '../../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import test from '../../place holders/test-1.svg'
import { selectUser } from '../../features/user/userSlice'

const NavBar = () => {
  const loggedInUser = useSelector(selectUser)

  const cartItemsNumber = useSelector(selectCartItemCount)
  const dispatch = useDispatch()
  useEffect(() => {
    if (loggedInUser) dispatch(fetchCart())
    return () => {}
  }, [loggedInUser])
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleMobileToggle = () => {
    setIsNavOpen((prev) => !isNavOpen)
  }
  return (
    <nav className='h-[50px]'>
      <div className='align-element nav-container flex items-center justify-between h-full  '>
        <CartLink top={`50px`} left={'50px'} />
        <Link className='w-[200px] h-full  grid place-items-center'>
          <img className='h-50px mr-10 ' src={test} alt='' />
        </Link>
        <div className='block sm:hidden'>
          <div>
            <i
              onClick={handleMobileToggle}
              className=' fa-solid fa-bars-staggered text-3xl cursor-pointer text-orange-500'
            ></i>
          </div>
        </div>
        <NavSearch />
        <ul className='hidden  sm:flex'>
          <NavLinks />
        </ul>
        {/*  */}
        <Link to='cart' className='hidden md:block'>
          <span className='relative'>
            <i className='fa-solid text-3xl fa-cart-shopping mr-7'></i>
            <span className=' absolute top-[-25px] right-[3px] indicator-item indicator-middle indicator-start badge badge-secondary'>
              {cartItemsNumber || 0}
            </span>
          </span>
        </Link>
      </div>

      <MobileNav setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
    </nav>
  )
}

export default NavBar
