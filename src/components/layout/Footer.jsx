import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  CreditCard,
  Truck,
  Gift,
} from 'lucide-react'
import img from '../../place holders/test-w.png'
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='bg-gray-800 text-gray-200'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold mb-4 text-white'>easy store</h3>
            <p className='text-gray-400'>
              Your one-stop destination for quality products with exceptional
              service and value.
            </p>
            <div className='flex flex-col space-y-2'>
              <div className='flex items-center'>
                <MapPin size={16} className='mr-2 text-gray-400' />
                <span>1 London Road SE11EB</span>
              </div>
              <div className='flex items-center'>
                <Phone size={16} className='mr-2 text-gray-400' />
                <span>+44 0207 555-555</span>
              </div>
              <div className='flex items-center'>
                <Mail size={16} className='mr-2 text-gray-400' />
                <span>support@easystore.com</span>
              </div>
            </div>
            <div className='flex space-x-4 mt-4'>
              <a href='#' className='hover:text-white transition-colors'>
                <Facebook size={20} />
              </a>
              <a href='#' className='hover:text-white transition-colors'>
                <Instagram size={20} />
              </a>
              <a href='#' className='hover:text-white transition-colors'>
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold mb-4 text-white'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Home
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Shop
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Categories
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  New Arrivals
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Best Sellers
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Special Offers
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  About Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold mb-4 text-white'>
              Customer Service
            </h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  My Account
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Order Tracking
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Wishlist
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  FAQs
                </a>
              </li>
            </ul>

            <div className='mt-6'>
              <h4 className='font-semibold mb-2 text-white'>Our Promises</h4>
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center'>
                  <Truck size={16} className='mr-2 text-gray-400' />
                  <span>Fast & Free Shipping</span>
                </div>
                <div className='flex items-center'>
                  <CreditCard size={16} className='mr-2 text-gray-400' />
                  <span>Secure Payment</span>
                </div>
                <div className='flex items-center'>
                  <Gift size={16} className='mr-2 text-gray-400' />
                  <span>Gift Cards Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer/Copyright */}
      <div className='bg-gray-900 py-4'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center '>
          <div className='text-sm text-gray-500'>
            © {year} easy store. All rights reserved.
          </div>
          {/* ---- logo ---- */}
          <img className='h-30px w-[100px]' src={img} alt='' />

          <div className='mt-4 md:mt-0'>
            <ul className='flex space-x-4 text-sm text-gray-500'>
              <li>
                <a href='#' className='hover:text-gray-400'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-400'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-400'>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
