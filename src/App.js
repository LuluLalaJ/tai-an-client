import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { TopBar, SideBar, Footer } from './components'
import { useSelector } from "react-redux";

import {
  AuthWrapper,
  Error,
  Home,
  Lessons,
  Signin,
  Profile,
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
  const { isSignedIn, role } = useSelector((store) => store.user);
  return (
    <>
      <AuthWrapper>
        <CssBaseline />
        <TopBar />
        <SideBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
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
        <Footer />
      </AuthWrapper>
    </>
  );
}

export default App
