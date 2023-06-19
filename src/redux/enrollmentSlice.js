import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { cancelEnrollmentSuccess, editEnrollmentStatusSuccess } from "./lessonSlice";

const initialState = {
  newEnrollment: null,
  isLoading: false,
  error: null
};

export const cancelEnrollment = createAsyncThunk(
  "enrollment/cancelEnrollment",
  async ([lessonId, enrollmentId], thunkAPI) => {
    try {
      const resp = await axios.delete(`/lessons/${lessonId}/enrollments/${enrollmentId}`);
      thunkAPI.dispatch(cancelEnrollmentSuccess([lessonId, enrollmentId]));
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const addEnrollment = createAsyncThunk(
  "enrollment/addEnrollment",
  async (lessonId, thunkAPI) => {
    try {
      const resp = await axios.post(`/lessons/${lessonId}/enrollments`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeEnrollmentStatus = createAsyncThunk(
  "enrollment/changeEnrollmentStatus",
  async ([lessonId, enrollmentId, data], thunkAPI) => {
    try {
      const resp = await axios.patch(
        `/lessons/${lessonId}/enrollments/${enrollmentId}`,
        data
      );
      thunkAPI.dispatch(editEnrollmentStatusSuccess([lessonId, enrollmentId, data]));
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
        state.error = null;
      })
      .addCase(cancelEnrollment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(cancelEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addEnrollment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEnrollment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newEnrollment = action.payload;
        state.error = null;
      })
      .addCase(addEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeEnrollmentStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeEnrollmentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      // .addCase(changeEnrollmentStatus.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // });
  },
});

export default enrollmentSlice.reducer;
