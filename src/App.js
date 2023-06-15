import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { TopBar, SideBar } from './components'
import { useSelector } from "react-redux";

import {
  About,
  AuthWrapper,
  Checkout,
  Error,
  Gallery,
  Home,
  Signin,
  Profile,
  PrivateRoute,
  Schedule,
  Signup,
  Students,
  Teachers,
} from "./pages";



const App = () => {
  const { isSignedIn, role } = useSelector((store) => store.user);

  return (
    <>
      <AuthWrapper>
        <CssBaseline />
        <TopBar />
        <SideBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* <Route path="/about" exact element={<About />} /> */}
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {isSignedIn && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/schedule" element={<Schedule />} />
            </>
          )}

          {isSignedIn && role === "teacher" && (
            <Route path="/students" element={<Students />} />
          )}

          {isSignedIn && role === "student" && (
            <Route path="/checkout" element={<Checkout />} />
          )}

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </AuthWrapper>
    </>
  );
}

export default App
