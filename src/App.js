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
} from "./pages";

const App = () => {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/about" exact element={<About />} /> */}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/teachers" exact element={<Teachers />} />
        <Route path="/gallery" exact element={<Gallery />} />
        <Route path="/signin" exact element={<Signin />} />
      </Routes>
    </>
  );
}

export default App
