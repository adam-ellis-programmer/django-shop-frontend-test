// src/hooks/useCart.js

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  selectCartItems,
  selectCartItemCount,
  selectCartTotalPrice,
  selectCartLoading,
  selectCartError,
} from '../features/cart/cartSlice'

/**
 * Custom hook for cart operations
 * @returns {Object} Cart methods and state
 */
const useCart = () => {
  const dispatch = useDispatch()

  // Select state from Redux store
  const items = useSelector(selectCartItems)
  const itemCount = useSelector(selectCartItemCount)
  const totalPrice = useSelector(selectCartTotalPrice)
  const loading = useSelector(selectCartLoading)
  const error = useSelector(selectCartError)

  /**
   * Fetch the user's cart
   */
  const getCart = () => {
    return dispatch(fetchCart())
  }

  /**
   * Add an item to the cart
   * @param {number} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @returns {Promise} - Promise that resolves when action is complete
   */
  const addToCart = (productId, quantity = 1) => {
    return dispatch(addItemToCart({ productId, quantity })).unwrap()
  }

  /**
   * Update the quantity of an item in the cart
   * @param {number} itemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise} - Promise that resolves when action is complete
   */
  const updateItem = (itemId, quantity) => {
    return dispatch(updateCartItem({ itemId, quantity })).unwrap()
  }

  /**
   * Remove an item from the cart
   * @param {number} itemId - Cart item ID
   * @returns {Promise} - Promise that resolves when action is complete
   */
  const removeItem = (itemId) => {
    return dispatch(removeCartItem(itemId)).unwrap()
  }

  /**
   * Clear all items from the cart
   * @returns {Promise} - Promise that resolves when action is complete
   */
  const emptyCart = () => {
    return dispatch(clearCart()).unwrap()
  }

  /**
   * Check if a product is in the cart
   * @param {number} productId - Product ID to check
   * @returns {Object|null} - Cart item if found, null otherwise
   */
  const isInCart = (productId) => {
    return items.find((item) => item.product.id === productId) || null
  }

  return {
    // State
    items,
    itemCount,
    totalPrice,
    loading,
    error,

    // Methods
    getCart,
    addToCart,
    updateItem,
    removeItem,
    emptyCart,
    isInCart,
  }
}

export default useCart
