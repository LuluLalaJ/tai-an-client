import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Navigate} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { TopBar, SideBar } from './components'
import { useSelector, useDispatch } from "react-redux";
import { getAllLessons } from './redux/lessonSlice';

import {
  About,
  AuthWrapper,
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
  LessonEditor,
  Product,
  Completion,
  Canceled
} from "./pages";



const App = () => {
  const dispatch = useDispatch()
  const { isSignedIn, role, user} = useSelector((store) => store.user);
  const { allLessons } = useSelector((store) => store.lesson)

  useEffect(() => {
    dispatch(getAllLessons());
  }, []);

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
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {isSignedIn && (
            <>
              <Route path="/lessons" exact element={<Lessons />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/schedule" element={<Schedule />} />
            </>
          )}

          {isSignedIn && role === "teacher" && (
            <>
              <Route path="/students" element={<Students />} />
              <Route path="/editor/:lessonId" element={<LessonEditor />} />
            </>
          )}

          {isSignedIn && role === "student" && (
            <>
              <Route path="/product" element={<Product />} />
              <Route path="/completion" element={<Completion />} />
              <Route path="/canceled" element={<Canceled />} />
            </>
          )}

          <Route path="*" element={<Error />} />
        </Routes>
      </AuthWrapper>
    </>
  );
}

export default App
