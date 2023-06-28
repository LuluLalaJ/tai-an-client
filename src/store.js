import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from './redux/teachersSlice';
import userReducer from './redux/userSlice'
import drawerReducer from './redux/drawerSlice'
import lessonReducer from "./redux/lessonSlice";
import enrollmentReducer from "./redux/enrollmentSlice";
import studentsReducer from "./redux/studentsSlice"
import "./index.css"

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    students: studentsReducer,
    user: userReducer,
    drawer: drawerReducer,
    lesson: lessonReducer,
    enrollment: enrollmentReducer,

  },
});
