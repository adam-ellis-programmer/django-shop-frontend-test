import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  MainLayout,
  HomePage,
  ContactPage,
  AboutPage,
  SignInPage,
  SignUpPage,
  ProductsPage,
  ProductPage,
  CartPage,
  UserProfile,
  UserListings,
  EditUserProduct,
  UserBookmarksPage,
  MyOrdersPage,
  MyCommentsPage,
  AddProductPage,
  DeleteProductPage,
  SearchPage,
  SearchByCategoryPage,
  PaymentPage,
  ReturnPage,
  MainError,
} from './components/index'

// In JavaScript, functions are reference types.
// import AddProductPage, { addProductAction } from './components/path/to/AddProductPage' test worked
// import { addProductAction } from './components/index'

import React from 'react'
import ReactDOM from 'react-dom/client'

// CSRF setup function
// async function setupCSRF() {
//   console.log('helllo')
//   try {
//     await fetch('http://localhost:8000/api/get-csrf-token/', {
//       method: 'GET',
//       credentials: 'include', // Important for setting cookies
//     })
//     console.log('CSRF token set')
//   } catch (error) {
//     console.error('Failed to set CSRF token:', error)
//   }
// }

// Call the function when the app loads
// setupCSRF()

import { store } from './app/store'
import { Provider } from 'react-redux'
// make error page 404, etc

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <MainError />,
    children: [
      { index: true, Component: HomePage },
      { path: 'contact', Component: ContactPage },
      { path: 'about', Component: AboutPage },
      { path: 'products', Component: ProductsPage },
      {
        path: 'add-product',
        Component: AddProductPage,
        // action: addProductAction,
      },
      { path: 'single-product/:id', Component: ProductPage },
      { path: 'delete-product/:id', Component: DeleteProductPage },
      { path: 'cart', Component: CartPage },
      { path: 'my-profile', Component: UserProfile },
      { path: 'my-listings', Component: UserListings },
      { path: 'edit-my-listing/:id', Component: EditUserProduct },
      { path: 'my-bookmarks', Component: UserBookmarksPage },
      { path: 'my-orders', Component: MyOrdersPage },
      { path: 'my-comments', Component: MyCommentsPage },
      { path: 'search', Component: SearchPage },
      { path: 'search-category', Component: SearchByCategoryPage },
      { path: 'payment-page', Component: PaymentPage },
      { path: 'return', Component: ReturnPage },
    ],
  },

  { path: 'sign-in', Component: SignInPage, errorElement: <MainError /> },
  { path: 'sign-up', Component: SignUpPage },
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
