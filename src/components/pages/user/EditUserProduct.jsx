import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, useParams, useNavigate } from 'react-router-dom'
import Header from '../../Headings/Header'
import { fields } from '../../../data/addProductFields'
import { renderField } from '../../../utils/utils'
import InfoAlert from '../../alerts/InfoAlert'
import {
  fetchCustomerProductById,
  updateProduct,
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
  selectUpdateSuccess,
  resetUpdateSuccess,
} from '../../../features/products/productsSlice'
import useTestUserCheck from '../../../hooks/useTestUserCheck'

const EditUserProduct = () => {
  const { checkTestUser } = useTestUserCheck()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  // Get state from Redux
  const product = useSelector(selectCurrentProduct)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const updateSuccess = useSelector(selectUpdateSuccess)

  // Fetch the product when component mounts
  useEffect(() => {
    scrollTo({ top: 0 })
    dispatch(fetchCustomerProductById(id))
  }, [dispatch, id])

  // Redirect on successful update
  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetUpdateSuccess()) // Reset the success state
      navigate('/my-listings')
    }
  }, [updateSuccess, navigate, dispatch])

  // Create the update product action
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (checkTestUser()) return

    const formData = new FormData(e.target)

    // Dispatch the updateProduct action
    dispatch(updateProduct({ productId: id, formData }))
  }

  if (loading && !product) {
    return <div className='text-center py-10'>Loading product details...</div>
  }

  if (error && !product) {
    return <div className='text-center py-10 text-red-500'>Error: {error}</div>
  }

  if (!product) {
    return <div className='text-center py-10'>Product not found</div>
  }

  return (
    <div className='m-h align-element'>
      <Header
        text={`Edit Product: ${product.name}`}
        styles={`text-center mt-5 text-2xl`}
      />
      {/* <div className='relative'>
        {loading && <InfoAlert msg={`Submitting please wait ...`} />}
      </div> */}
      <div className='max-w-[900px] m-auto'>
        <Form
          method='POST'
          className=''
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <div className='grid md:grid-cols-3 gap-3'>
            {[...fields]
              .slice(0, 14)
              .map((field) => renderField(field, product))}
            <div>
              {product?.bullet_points?.map((item, i) => {
                return (
                  <div key={i} className='flex items-center'>
                    <div className='badge badge-primary badge-sm mr-3'>
                      {i + 1}
                    </div>
                    <input
                      key={item?.id}
                      type='text'
                      placeholder='bullet point three'
                      className='input input-secondary w-full my-1'
                      name={`bullet_${i + 1}`}
                      id={`bullet-${i + 1}`}
                      defaultValue={item?.text}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          {[...fields].slice(14).map((field) => renderField(field, product))}
          <div className='flex justify-between mt-6'>
            <button
              type='button'
              className='btn btn-outline'
              onClick={() => navigate('/my-listings')}
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type='submit'
              className='btn btn-dash btn-secondary'
              onClick={() => {
                scrollTo({
                  top: 0,
                })
              }}
            >
              {loading ? (
                <>
                  Updating
                  <span className='loading loading-spinner loading-xl'></span>
                </>
              ) : (
                <>Update Product</>
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EditUserProduct
