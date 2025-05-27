import React from 'react'

const Header = ({ styles, text, price }) => {
  return (
    <h2 className={styles}>
      {text} {price && <span className='bg-amber-400 p-2 rounded-lg' >{price}</span>}
    </h2>
  )
}

export default Header
