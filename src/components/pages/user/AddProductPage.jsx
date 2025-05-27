import { fields } from '../../../data/addProductFields'
import {
  Form,
  useNavigate,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import Header from '../../Headings/Header'
import { renderField } from '../../../utils/utils'
import { useState, useEffect } from 'react'
import InfoAlert from '../../alerts/InfoAlert'
import AddBulletPoint from './AddBulletPoint'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct,
  selectProductsLoading,
  selectProductsError,
  selectAddProductSuccess,
  resetAddProductSuccess,
} from '../../../features/products/productsSlice'
import useTestUserCheck from '../../../hooks/useTestUserCheck'

// Updated component with Redux
const AddProductPage = () => {
  const { isTestUser, checkTestUser } = useTestUserCheck()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navigation = useNavigation()

  // Get state from Redux
  const isLoading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const success = useSelector(selectAddProductSuccess)

  // Local UI state if needed
  const [submitAttempted, setSubmitAttempted] = useState(false)

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    // prettier-ignore
    if (checkTestUser()) {
      return
    }

    event.preventDefault()
    setSubmitAttempted(true)

    const form = event.target
    const formData = new FormData(form)

    // Process boolean fields
    const booleanFields = [
      'featured',
      'inStock',
      'new',
      'onSale',
      'popular',
      'specialOffer',
      'suspend',
    ]

    booleanFields.forEach((field) => {
      const isChecked = formData.has(field)
      formData.delete(field)
      formData.append(field, isChecked ? 'true' : 'false')
    })

    // Dispatch the addProduct action
    await dispatch(addProduct(formData))
  }

  // Navigate on success
  useEffect(() => {
    if (success) {
      dispatch(resetAddProductSuccess()) // Reset the success flag
      navigate('/my-listings')
    }
  }, [success, navigate, dispatch])

  return (
    <div className='m-h align-element'>
      {isLoading ? (
        <InfoAlert msg={`Submitting`} />
      ) : (
        <Header
          text={`add a new product`}
          styles={`text-center mt-5 text-2xl`}
        />
      )}

      {error && submitAttempted && (
        <div className='alert alert-error mb-4'>{error}</div>
      )}

      <div className='max-w-[900px] m-auto'>
        <Form
          method='POST'
          className=''
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <div className='grid md:grid-cols-3 gap-3'>
            {[...fields].slice(0, 14).map(renderField)}
            <AddBulletPoint />
          </div>
          {[...fields].slice(14, 16).map(renderField)}
          <button
            disabled={isLoading}
            type='submit'
            className='btn btn-dash btn-secondary w-full'
            onClick={() => {
              scrollTo({
                top: 0,
              })
            }}
          >
            {isLoading ? (
              <>
                SUBMITTING
                <span className='ml-8 loading loading-spinner loading-xl'></span>
              </>
            ) : (
              'Submit Product'
            )}
          </button>
        </Form>
      </div>
    </div>
  )
}

export default AddProductPage
