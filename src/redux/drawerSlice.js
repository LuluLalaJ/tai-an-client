import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isOpen: false,
};


const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
        state.isOpen = action.payload;
    },
    openDrawer: state => {
        state.isOpen = true
    },

    closeDrawer: state => {
        state.isOpen = false
    }
  },
});


export const { toggleDrawer, openDrawer, closeDrawer } =
  drawerSlice.actions;
export default drawerSlice.reducer;
