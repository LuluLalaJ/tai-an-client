import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  isSignedIn: false,
  signInError: null,
  signUpError: null,
  signOutError: null,
  error: null,
  editProfileError: null,
  role: "",
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

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (signUpInfo, thunkAPI) => {
    try {
      const resp = await axios.post("/signup", signUpInfo);
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

export const editStudentProfile = createAsyncThunk(
  "user/editStudentProfile",
  async ([studentId, profileInfo], thunkAPI) => {
    try {
      const resp = await axios.patch(`/students/${studentId}`, profileInfo);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editTeacherProfile = createAsyncThunk(
  "user/editTeacherProfile",
  async ([teacherId, profileInfo], thunkAPI) => {
    try {
      const resp = await axios.patch(`/teachers/${teacherId}`, profileInfo);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.signInError = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = true;
        state.signInError = null;
        state.role = action.payload.role;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.signInError = action.payload;
      })
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.signOutError = null;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = false;
        state.signOutError = null;
        state.role = "";
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.signOutError = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.signUpError = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSignedIn = true;
        state.signUpError = null;
        state.role = action.payload.role;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.signUpError = action.payload;
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
        state.role = action.payload.role;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editStudentProfile.pending, (state) => {
        state.isLoading = true;
        state.editProfileError = null;
      })
      .addCase(editStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.editProfileError = null;
      })
      .addCase(editStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.editProfileError = action.payload;
      })
      .addCase(editTeacherProfile.pending, (state) => {
        state.isLoading = true;
        state.editProfileError = null;
      })
      .addCase(editTeacherProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.editProfileError = null;
      })
      .addCase(editTeacherProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.editProfileError = action.payload;
      });
  },
});

export default userSlice.reducer;
