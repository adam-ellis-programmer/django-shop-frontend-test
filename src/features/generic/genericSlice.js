import { createSlice } from '@reduxjs/toolkit'
import { isTestUser } from '../../utils/authUtils'

const initialState = {
  value: 0,
  pageAlert: false,
  testUser: isTestUser() || false,
  pageAlertMsg: '',
  typeOfError: 'alert-info',
}

export const genericSlice = createSlice({
  name: 'generic',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.pageAlert = action.payload.show
      state.pageAlertMsg = action.payload.msg
      state.typeOfError = action.payload.type
    },
    resetAlert: (state) => {
      state.pageAlert = false
      state.pageAlertMsg = ''
      state.typeOfError = 'alert-info'
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAlert, resetAlert } = genericSlice.actions
export const selectPageAlert = (state) => state.generic.pageAlert
export const selectPageAlertMsg = (state) => state.generic.pageAlertMsg
export const selectPageAlertMsgType = (state) => state.generic.typeOfError

export default genericSlice.reducer
