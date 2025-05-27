import React from 'react'
import { Outlet } from 'react-router-dom'

import { NavBar, Header, Footer, MobileSearch } from '../index'
import PageAlert from './PageAlert'
import {
  selectPageAlert,
  selectPageAlertMsg,
  selectPageAlertMsgType,
} from '../../features/generic/genericSlice'
import { useSelector } from 'react-redux'
function MainLayout() {
  const showAlert = useSelector(selectPageAlert)
  const showAlertMsg = useSelector(selectPageAlertMsg)
  const alertType = useSelector(selectPageAlertMsgType)
  // console.log('SHOW ALERT?', showAlert, showAlertMsg)

  return (
    <div className='relative'>
      {showAlert && <PageAlert msg={showAlertMsg} type={alertType} />}
      <Header />
      <NavBar />
      <MobileSearch />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
