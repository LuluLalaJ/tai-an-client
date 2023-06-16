import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from './redux/teachersSlice';
import userReducer from './redux/userSlice'
import drawerReducer from './redux/drawerSlice'
import lessonReducer from "./redux/lessonSlice";

export const store = configureStore( {
    reducer: {
        teachers: teachersReducer,
        user: userReducer,
        drawer: drawerReducer,
        lesson: lessonReducer,
    }
})
