import React from 'react'
import { Navigate, Outlet} from 'react-router'

const ProtectedRoute = () => {
    const Auth = {'auth_token' : false}


  return (
    <div>
      Auth.auth_token ? <Navigate to={'/loginpage'}/>  : <Outlet/>
    </div>
  )
}

export default ProtectedRoute
