import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = ({children}) => {
  const { isSignedIn } = useSelector((store) => store.user);

  return (
    isSignedIn
    ? children
    : <Navigate to="/" />
  )
}

export default PrivateRoute


