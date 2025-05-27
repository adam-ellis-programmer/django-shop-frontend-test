import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { resetAlert, setAlert } from '../features/generic/genericSlice'

const useGlobalMessage = () => {
  const dispatch = useDispatch()
  // prettier-ignore
  // Prevents the showMessage function from being recreated on every rend
  const showMessage = useCallback((customMessage, alertType = 'alert-error') => {
      dispatch(
        setAlert({
          show: true,
          msg: customMessage,
          type: alertType,
        })
      )
      setTimeout(() => {
        dispatch(resetAlert())
      }, 3000)
    },
    [dispatch]
  )

  return { showMessage }
}

export default useGlobalMessage
