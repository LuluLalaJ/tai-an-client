import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { TopBar, SideBar } from './components'
import {
  About,
  Error,
  Gallery,
  Home,
  Login,
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
        <Route path="/about" exact element={<About />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/teachers" exact element={<Teachers />} />
        <Route path="/gallery" exact element={<Gallery />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </>
  );
}

export default App
