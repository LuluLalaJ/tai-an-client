import React from 'react'
import { useDispatch, useSelector } from "react-redux";


const AuthWrapper = ({ children }) => {
  const { isLoading } = useSelector((store) => store.user);

  if (isLoading) {
    return (
        <h1>
            Loading...
        </h1>
    )
  }

  return (
    <>
        {children}
    </>
  )
}

export default AuthWrapper
