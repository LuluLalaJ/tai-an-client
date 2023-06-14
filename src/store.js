import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from './redux/teachersSlice'

export const store = configureStore( {
    reducer: {
        teachers: teachersReducer,
    }
})
