import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newLessonTime: { start: "", end: "" },
  newLesson: "",
  // newLessonValues: "",
  allLessons: [],
  myLessons: [],
  error: null,
  isLoading: false,
  isNewLessonFormModalOpen: false,
  // calendarApi: "",
  isLessonPopOpen: false
};

export const getAllLessons = createAsyncThunk(
  "lesson/getAllLessons",
  async (thunkAPI) => {
    try {
      const resp = await axios("/lessons");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTeacherLessons = createAsyncThunk("lesson/getTeacherLessons", async (id, thunkAPI) => {
  try {
    const resp = await axios(`/teachers/${id}/lessons`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getStudentLessons = createAsyncThunk(
  "lesson/getStudentLessons",
  async (id, thunkAPI) => {
    try {
      const resp = await axios(`/students/${id}/lessons`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postNewLesson = createAsyncThunk(
  "lesson/postNewLesson",
  async (newLessonInfo, thunkAPI) => {
    try {
      const resp = await axios.post(`/lessons`, newLessonInfo);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    // updateNewLessonValues: (state, action) => {
    //   state.newLessonValues = action.payload;
    // },
    openNewLessonFormModal: (state) => {
      state.isNewLessonFormModalOpen = true;
    },
    closeNewLessonFormModal: (state) => {
      state.isNewLessonFormModalOpen = false;
    },
    updateNewLessonTime: (state, action) => {
      state.newLessonTime = { ...action.payload };
    },
    setLessonPopAnchorEl: (state, action) => {
      state.lessonPopAnchorEl = action.payload
    },
    openLessonPop:(state) => {
      state.isLessonPopOpen = true
    },
    closeLessonPop:(state) => {
      state.isLessonPopOpen = false
    }


    // updateCalendarApi: (state, action) => {
    //   state.calendarApi = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allLessons = action.payload;
        state.error = null;
      })
      .addCase(getAllLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTeacherLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeacherLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myLessons = action.payload;
        state.error = null;
      })
      .addCase(getTeacherLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getStudentLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStudentLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myLessons = action.payload;
        state.error = null;
      })
      .addCase(getStudentLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postNewLesson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postNewLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newLesson = action.payload;
        state.error = null;
      })
      .addCase(postNewLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  openNewLessonFormModal,
  closeNewLessonFormModal,
  updateNewLessonValues,
  updateNewLessonTime,
  openLessonPop,
  closeLessonPop
  // updateCalendarApi,
} = lessonSlice.actions;
export default lessonSlice.reducer;
