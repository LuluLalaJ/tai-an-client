import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { TopBar, SideBar } from './components'
import {
  About,
  Error,
  Gallery,
  Home,
  Signin,
  PrivateRoute,
  Signup,
  Teachers,
  AuthWrapper,
} from "./pages";
import { Dashboard } from '@mui/icons-material';



const App = () => {
  return (
    <AuthWrapper>
      <CssBaseline />
      <TopBar />
      <SideBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <Route path="/about" exact element={<About />} /> */}
    </AuthWrapper>
  );
}

export default App
