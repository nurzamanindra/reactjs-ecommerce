import React from 'react'
import { getUser } from '../../services/userService'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = getUser();

  const location = useLocation();

  return user ? <Outlet/> : <Navigate to="/login" state={{from : location.pathname}}/>;
  
}

export default ProtectedRoute