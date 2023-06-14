import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  isSignedIn: false,
  error: null,
};

export const signInUser = createAsyncThunk(
  "user/signinUser",
  async (signInInfo, thunkAPI) => {
    try {
      const resp = await axios.post("/login", signInInfo);
      return resp.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
  }});

export const signOutUser = createAsyncThunk(
  "user/signInUser",
  async (thunkAPI) => {
    try {
      const resp = await axios.delete("/logout");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkSession = createAsyncThunk(
  "user/checkSession",
  async (thunkAPI) => {
    try {
      const resp = await axios("/check_session");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = false;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = true;
        state.error = null;

      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
