import React from 'react'
import { CartLink } from '../index'
import { Link } from 'react-router-dom'
import { MobileNavLinks } from './NavLinks'
import logo from '../../place holders/test-1.svg'
const MobileNav = ({ setIsNavOpen, isNavOpen }) => {
  const oncick = () => {
    setIsNavOpen(false)
  }
  //   className={`bg-white border fixed z-10 h-screen top-0 w-full max-w-[700px] left-1/2 -translate-x-1/2`}
  return (
    <div
      className={`mobile-nav-container ${
        isNavOpen && 'mobileOpen'
      } md:hidden px-5`}
    >
      <div className='h-[80px] flex items-center justify-between'>
        <CartLink setIsNavOpen={setIsNavOpen} mobile />
        <img className='w-40' src={logo} alt='' />
        <button className='sm:hidden'>
          <i
            onClick={() => setIsNavOpen(false)}
            className='fa-solid fa-circle-xmark text-5xl text-orange-600 cursor-pointer'
          ></i>
        </button>
      </div>

      {/* <div className='border h-[100px] mt-10 flex justify-between'>
        <div className='border h-[50px] w-[50px]'></div>
        <div className='border h-[50px] w-[50px]'></div>
      </div> */}
      {<MobileNavLinks oncick={oncick} />}
    </div>
  )
}

export default MobileNav
