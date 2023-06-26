import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { checkSession } from '../../redux/userSlice';


const AuthWrapper = ({ children }) => {
  const { isLoading, isSignedIn } = useSelector((store) => store.user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkSession());
  }, [isSignedIn, dispatch]);

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
