import React from 'react'
import { HeaderLinks } from './NavLinks'
import { useSelector, useDispatch } from 'react-redux'
import Indicator from '../images/Indicator'
import { Link } from 'react-router-dom'
import DarkModeButton from './DarkModeButton'
import { API_URL } from '../../config'
const Header = () => {
  const user = useSelector((state) => state.user.user)

  const userInitials = user?.first_name[0] + ' ' + user?.last_name[0]

  // In your navigation component or wherever you want to place the admin link
  const AdminLink = () => {
    // This will handle both development and production environments
    // const adminUrl =
    //   import.meta.env.VITE_NODE_ENV === 'production'
    //     ? '/admin/' // In production, they'll be on the same domain
    //     : 'http://localhost:8000/admin/'
    const adminUrl = import.meta.env.VITE_NODE_ENV === API_URL + '/admin'

    return (
      <a href={adminUrl} target='_blank' rel='noopener noreferrer'>
        <span className=''> Admin</span>
      </a>
    )
  }

  return (
    <div className=' min-h-[50px] align-element  '>
      <div className='flex items-center justify-end p-5 '>
        <Link className='hidden lg:block' to={`/search`}>
          <div className='badge  bg-blue-400 mr-3 text-white'>search </div>
        </Link>
        <DarkModeButton />
        {user ? (
          <div className=' flex items-center justify-end'>
            <Link className=' ' to={`/my-profile`}>
              <div className=' flex items-center'>
                <span className=' show-above-500'>
                  welcome {user?.first_name}
                  {/* {user?.last_name} */}
                </span>
                <span className=' text-white grid place-items-center text-[1rem]  w-[40px] h-[40px] p-1 rounded-full bg-red-400 mx-3'>
                  {userInitials}
                </span>
              </div>
            </Link>
            <span>{<AdminLink />}</span>
          </div>
        ) : (
          <div className=' flex justify-end '>
            {/* login / logout / sign in / up button logic */}
            <span className='show-above-500'>welcome shopper</span>
          </div>
        )}
        <ul className='  flex justify-end '>{<HeaderLinks />}</ul>
      </div>
    </div>
  )
}

export default Header
