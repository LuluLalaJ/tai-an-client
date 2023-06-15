import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { TopBar, SideBar } from './components'
import {
  About,
  AuthWrapper,
  Checkout,
  Error,
  Gallery,
  Home,
  Lessons,
  Signin,
  Profile,
  PrivateRoute,
  Schedule,
  Signup,
  Students,
  Teachers,
} from "./pages";



const App = () => {
  return (
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

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/students" element={<Students />} />

      </Routes>
    </AuthWrapper>
  );
}

export default App
