import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Headings/Header'
import {
  fetchOrders,
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
} from '../../../features/orders/orderslice'

const MyOrdersPage = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const loading = useSelector(selectOrdersLoading)
  const error = useSelector(selectOrdersError)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  // Function to calculate progress percentage based on status
  const getStatusProgress = (status) => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered']
    let currentIndex = statuses.indexOf(status.toLowerCase())

    if (currentIndex === -1) return 0

    if (currentIndex === 0) currentIndex = 0.5

    /**
     * This calculates the percentage completion:
     ->  For "pending": (0 / 3) * 100 = 0%
     ->  For "processing": (1 / 3) * 100 = 33.33%
     ->  For "shipped": (2 / 3) * 100 = 66.67%
     ->  For "delivered": (3 / 3) * 100 = 100%
     */

    return (currentIndex / (statuses.length - 1)) * 100
  }

  // Format date string from ISO format
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className='align-element m-h text-center my-10'>
        <div className='loading loading-spinner loading-lg'></div>
        <p>Loading your orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='align-element m-h text-center my-10'>
        <div className='alert alert-error'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    )
  }

  const getBg = (i) => {
    if (i % 2 === 0) {
      return 'bg-gray-100 order-item'
    } else {
      return 'order-item2'
    }
  }

  return (
    <div className='align-element m-h'>
      <Header text={`My Orders`} styles={`text-center text-2xl my-10`} />
      <section className='max-w-[800px] m-auto h-[600px] overflow-scroll shadow-2xl'>
        {orders.length === 0 ? (
          <div className='text-center p-10'>
            <p className='mb-4'>You haven't placed any orders yet.</p>
            <a href='/products' className='btn btn-primary'>
              Browse Products
            </a>
          </div>
        ) : (
          orders.map((order, i) => {
            // console.log(order.status)
            return (
              <div
                key={order.id}
                className={`collapse bg-base-100 border border-base-300 ${getBg(
                  i
                )}`}
              >
                <input
                  type='radio'
                  name='my-accordion-1'
                  checked={expandedOrder === order.id}
                  onChange={() => setExpandedOrder(order.id)}
                />
                <div className='collapse-title font-semibold flex justify-between items-center'>
                  <div>Order #{order.id}</div>
                  <div className='badge badge-outline capitalize'>
                    {order.status}
                  </div>
                </div>
                <div className='collapse-content text-sm'>
                  {/* Order Status Progress */}
                  <div className='mb-4'>
                    <progress
                      className='progress progress-primary w-full'
                      value={getStatusProgress(order.status)}
                      max='100'
                    ></progress>
                    <div className='flex justify-between text-xs mt-1'>
                      <span>Pending</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div
                    className={`grid grid-cols-4 p-3 font-medium bg-base-200 ${getBg(
                      i
                    )}`}
                  >
                    <div>Items</div>
                    <div>Order Number</div>
                    <div>Order Date</div>
                    <div>Amount</div>
                  </div>
                  <div className='grid grid-cols-4 p-3 border-b'>
                    <div>{order.item_count}</div>
                    <div>{order.id}</div>
                    <div>{formatDate(order.created_at)}</div>
                    <div>£{parseFloat(order.total_amount).toFixed(2)}</div>
                  </div>

                  {/* Order Items */}
                  <div className='mt-4'>
                    <h3 className='font-medium mb-2'>Order Items:</h3>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex gap-4 items-center p-2 border-b border-dashed ${getBg(
                          i
                        )}`}
                      >
                        <div className='w-16 h-16 flex-shrink-0'>
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.product_name}
                              className='w-full h-full object-cover rounded-md'
                            />
                          ) : (
                            <div className='w-full h-full bg-gray-200 flex items-center justify-center rounded-md'>
                              <span className='text-xs text-gray-500'>
                                No image
                              </span>
                            </div>
                          )}
                        </div>
                        <div className='flex-1'>
                          <div className='font-medium'>{item.product_name}</div>
                          <div className='text-sm text-gray-600'>
                            <span className={`${getBg(i)}`}>
                              {item.quantity} × £{' '}
                              {parseFloat(item.product_price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className='font-medium'>
                          £{parseFloat(item.total_price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Information if available */}
                  {order.tracking_number && (
                    <div className='mt-4 p-3 bg-base-200 rounded-md'>
                      <p className='font-medium'>
                        Tracking Number: {order.tracking_number}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </section>
    </div>
  )
}

export default MyOrdersPage
