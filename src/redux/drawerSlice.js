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
    }
  },
});


export const { toggleDrawer } =
  drawerSlice.actions;
export default drawerSlice.reducer;
