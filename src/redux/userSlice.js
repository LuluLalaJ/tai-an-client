import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  isSignedIn: false,
};

export const signInUser = createAsyncThunk(
  "user/signinUser",
  async (signInInfo, thunkAPI) => {
    try {
      const resp = await axios.post("/login", signInInfo);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signOutUser = createAsyncThunk(
  "user/signInUser",
  async (thunkAPI) => {
    try {
      const resp = await axios.delete("/logout");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
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
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = true;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
