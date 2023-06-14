import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: true,
  isSignedIn: false,
};

export const signinUser = createAsyncThunk(
  "user/signinUser",
  async (signinInfo, thunkAPI) => {
    try {
      const resp = await axios.post("/login", signinInfo);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
