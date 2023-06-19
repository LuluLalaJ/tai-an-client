import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  enrollment: null,
  isLoading: false,
  error: null
};

export const cancelEnrollment = createAsyncThunk(
  "enrollment/cancelEnrollment",
  async (data, thunkAPI) => {
    try {
      const resp = await axios("/teachers");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelEnrollment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelEnrollment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrollment = action.payload;
      })
      .addCase(cancelEnrollment.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default enrollmentSlice.reducer;
