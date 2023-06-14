import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    teachers: [],
    isLoading: true,
}

export const getTeachers = createAsyncThunk(
    'teachers/getTeachers',
    async (thunkAPI) => {
        try {
          // console.log(thunkAPI);
          // console.log(thunkAPI.getState());
          const resp = await axios("/teachers");
        //   console.log(resp)
          // console.log(resp.data)
          return resp.data;
        } catch (error) {
            // double check this line
            return thunkAPI.rejectWithValue();
        }
    }
)

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getTeachers.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getTeachers.fulfilled, (state, action) => {
        //console.log(action)
        state.isLoading = false;
        state.teachers = action.payload;
    })
    .addCase(getTeachers.rejected, (state, action) => {
        // console.log(action)
        state.isLoading = false;
    });
  },
});

export default teachersSlice.reducer;
