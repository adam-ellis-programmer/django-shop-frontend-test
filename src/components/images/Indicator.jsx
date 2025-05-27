import React from 'react'

const Indicator = ({ count }) => {
  return (
    <div className='indicator'>
      <span className='indicator-item badge badge-secondary'>{count}</span>
      <button className='btn'>inbox</button>
    </div>
  )
}

export default Indicator
