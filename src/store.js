import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from './redux/teachersSlice';
import userReducer from './redux/userSlice'

export const store = configureStore( {
    reducer: {
        teachers: teachersReducer,
        user: userReducer,
    }
})
