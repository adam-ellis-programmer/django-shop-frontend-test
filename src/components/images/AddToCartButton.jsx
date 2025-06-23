// src/components/AddToCartButton.jsx

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItemToCart,
  resetCartSuccess,
  selectCartLoading,
} from '../../features/cart/cartSlice'
import useTestUserCheck from '../../hooks/useTestUserCheck'
import useGlobalMessage from '../../hooks/useGlobalMessage'
import useAuth from '../../hooks/checkAuthStatus'

const AddToCartButton = ({ front, product }) => {
  const alertRef = useRef()
  const { isLoggedIn } = useAuth()
  const { isTestUser, checkTestUser } = useTestUserCheck()
  const dispatch = useDispatch()
  const loading = useSelector(selectCartLoading)
  const [isAdding, setIsAdding] = useState(false)
  const [selectedQuantity, setselectedQuantity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const { showMessage } = useGlobalMessage()

  const itemsInStock = Array.from(
    { length: product?.itemsInStock },
    (_, i) => i + 1
  )
  const handleAddToCart = () => {
    // console.log('isLoggedIn', isLoggedIn)
    if (!isLoggedIn) {
      setShowAlert(true)
      return
    }
    if (checkTestUser()) return

    if (selectedQuantity === 0) {
      showMessage(
        'Please select a quantity before adding to cart',
        'alert-error'
      )
      return
    }
    if (loading || isAdding) return

    setIsAdding(true)
    // console.log('Adding to cart:', product)

    dispatch(
      addItemToCart({
        productId: product.id,
        quantity: selectedQuantity,
      })
    )
      .unwrap()
      .then(() => {
        scrollTo({ top: 0 })
        setTimeout(() => {
          dispatch(resetCartSuccess())
        }, 3000)
      })
      .catch((error) => {
        console.error('Failed to add product to cart:', error)
      })
      .finally(() => {
        setIsAdding(false)
      })
  }

  const handleSelect = (e) => {
    let numInStock = e.target.selectedOptions[0].value
    setselectedQuantity(numInStock)
  }

  useEffect(() => {
    if (showAlert && alertRef.current) {
      alertRef.current.focus()
    }
  }, [showAlert])

  const renderSelect = () => {
    return (
      <select
        onChange={(e) => handleSelect(e)}
        defaultValue='Pick a language'
        className='select select-secondary mr-5 select-dark'
      >
        <option disabled={true}>select amount</option>
        {itemsInStock.map((i) => {
          return (
            <option value={i} key={i}>
              {i}
            </option>
          )
        })}
      </select>
    )
  }

  // for the product card display
  if (front) {
    return (
      <>
        <div
          onClick={handleAddToCart}
          className={`badge text-white bg-[#224573] ${
            loading || isAdding
              ? 'opacity-75 cursor-not-allowed'
              : 'cursor-pointer hover:bg-[#1a3557]'
          }`}
        >
          {isAdding ? 'Adding...' : 'Add To Cart'}
        </div>
      </>
    )
  }

  return (
    <div className=''>
      {showAlert && (
        <div
          tabIndex={-1}
          ref={alertRef}
          className='mb-5 rounded text-center p-3 bg-rose-400 text-white'
        >
          log in to add to cart!{' '}
        </div>
      )}
      <div className='flex'>
        {renderSelect()}
        <button
          onClick={handleAddToCart}
          className='btn btn-secondary'
          disabled={loading || isAdding}
        >
          {isAdding ? (
            <>
              <span
                className='spinner-border spinner-border-sm me-2'
                role='status'
                aria-hidden='true'
              ></span>
              Adding...
            </>
          ) : (
            'Add to cart'
          )}
        </button>
      </div>
    </div>
  )
}

export default AddToCartButton
