import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
  const { isSignedIn } = useSelector((store) => store.user);
  if (!isSignedIn) {
    return <Navigate to='/'/>
  }
  return children
}

export default PrivateRoute
