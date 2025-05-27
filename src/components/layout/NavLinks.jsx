import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userSlice' // Import your logout action

// ==========================================================================
// NAV LINKS DATA
// ==========================================================================

const navLinks = [
  {
    id: 1,
    url: '/',
    text: 'Home',
    icon: 'fa-house ',
    img: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  { id: 2, url: 'contact', text: 'Contact', icon: 'fa-house ' },
  { id: 3, url: 'about', text: 'About', icon: 'fa-circle-info ' },
  { id: 4, url: 'products', text: 'Browse', icon: 'fa-shop ' },
  // { id: 5, url: 'single-product', text: 'Single prod' },
]

// ==========================================================================
// HEADER LINKS DATA
// ==========================================================================

const headerLinks = [
  { id: 1, url: 'sign-in', text: 'Sign In' },
  { id: 2, url: 'sign-up', text: 'Sign Up' },
  { id: 3, url: null, text: 'Logout' }, // Set url to null for logout
]

export const NavLinks = () => {
  return navLinks.map(({ id, url, text }) => {
    return (
      <li key={id}>
        <NavLink className='mx-3  text-lg p-2 rounded' to={url}>
          {text}
        </NavLink>
      </li>
    )
  })
}

// ==========================================================================
// HEADER LINKS
// ==========================================================================

export const HeaderLinks = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle logout function
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
    navigate('/') // Redirect to home page after logout
  }

  // Filter links based on authentication status
  const linksToShow = headerLinks.filter((link) => {
    if (user) {
      // When logged in, show only Logout
      return link.text === 'Logout'
    } else {
      // When logged out, show only Sign In and Sign Up
      return link.text === 'Sign In' || link.text === 'Sign Up'
    }
  })

  return linksToShow.map(({ id, url, text }) => {
    // Special case for Logout button
    if (text === 'Logout') {
      return (
        <li key={id} className='mx-3'>
          <a href='#' onClick={handleLogout}>
            {text}
          </a>
        </li>
      )
    }

    // Regular NavLink for other links
    return (
      <li key={id} className='mx-3'>
        <NavLink className='' to={url}>{text}</NavLink>
      </li>
    )
  })
}

// ==========================================================================
// MOBILE NAV LINKS
// ==========================================================================

export const MobileNavLinks = ({ oncick }) => {
  return [...navLinks].reverse().map(({ id, url, text, icon, img }, i) => {
    return (
      <li key={id} className='list-none '>
        <NavLink
          onClick={oncick}
          className=' text-2xl w-full block mb-2'
          to={url}
        >
          <div className='shadow-[1px_1px_5px_#ccc]  h-[200px] bg-[#475970] flex items-center justify-center rounded'>
            <div>
              <p className='text-white mb-5 text-center'>{text}</p>
              <i className={`fa-solid ${icon} text-5xl text-white`}></i>
            </div>
          </div>
        </NavLink>
      </li>
    )
  })
}
