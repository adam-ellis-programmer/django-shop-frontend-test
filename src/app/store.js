// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/user/userSlice'
import productReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'
import commentsReducer from '../features/comments/commentsSlice'
import bookmarkReducer from '../features/bookmarks/bookmarkSlice'
import filterReducer from '../features/filters/filtersSllice'
import paymentReducer from '../features/payment/paymentSlice'
import orderReducer from '../features//orders/orderslice'
import updateUserReducer from '../features/user/updateUserSlice'
import genericSlice from '../features/generic/genericSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    comments: commentsReducer,
    bookmark: bookmarkReducer,
    filters: filterReducer,
    payment: paymentReducer,
    orders: orderReducer,
    updateUser: updateUserReducer,
    generic: genericSlice,
  },
})
