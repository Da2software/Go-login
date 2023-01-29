import React, { ReactNode } from 'react'
import { Navigate, Route, Outlet } from 'react-router-dom'

function PrivateRoute() {
  let isAuth = false
  // const resAuth = await auth.userAuth()
  return (
    isAuth
      ?
      <Outlet/>
      :
      <Navigate to={"/login"}></Navigate>
  )
}
export default PrivateRoute