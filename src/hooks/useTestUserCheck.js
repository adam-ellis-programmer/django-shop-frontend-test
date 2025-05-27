import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { isTestUser } from '../utils/authUtils'
import { resetAlert, setAlert } from '../features/generic/genericSlice'

// Side effect: Shows an alert if user is a test user
// Return value: Returns boolean to control code flow

const useTestUserCheck = () => {
  const dispatch = useDispatch()
  const [testUser] = useState(isTestUser())

  const checkTestUser = useCallback(
    (
      customMessage = 'You cannot perform this action as you are a test user'
    ) => {
      if (testUser) {
        dispatch(
          setAlert({
            show: true,
            msg: customMessage,
            type: 'alert-error',
          })
        )
        setTimeout(() => {
          dispatch(resetAlert())
        }, 3000)
        return true // User is a test user
      }
      return false // User is not a test user
    },
    [testUser, dispatch]
  )

  return {
    isTestUser: testUser,
    checkTestUser,
  }
}

export default useTestUserCheck
