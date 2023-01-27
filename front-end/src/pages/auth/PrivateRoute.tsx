import React, { ReactNode } from 'react'
import { Navigate, Route, Outlet } from 'react-router-dom'
import { AuthEndpoints } from '../../api/auth';

const auth = new AuthEndpoints();

function PrivateRoute() {
  let isAuth = false
  // const resAuth = await auth.userAuth()
  return (
    !isAuth
      ?
      <Outlet/>
      :
      <Navigate to={"/login"}></Navigate>
  )
}
export default PrivateRoute