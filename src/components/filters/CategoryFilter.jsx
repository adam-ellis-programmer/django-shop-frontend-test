import { useMemo, useState } from 'react'
import { categories } from '../../data/dataArrays'
import { Link, Navigate, useNavigate } from 'react-router-dom'

// set searh params here only

const CategoryFilter = ({ products }) => {
  const navigate = useNavigate()
  const handleClick = (searchTerm) => {
    navigate(`/search-category?q=${encodeURIComponent(searchTerm).trim()}`)
  }
  return (
    <div>
      <ul className=' mr-10'>
        {categories.map((i) => {
          return (
            <li key={i} onClick={() => handleClick(i)} className='mb-3'>
              <button className=' btn btn-soft  dark-cat-btn w-full'>{i}</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryFilter
