import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newLessonTime: { start: "", end: "" },
  newLesson: "",
  allLessons: [],
  myLessons: [],
  currentCal: [],
  error: null,
  isLoading: false,
  isNewLessonFormModalOpen: false,
  isLessonPopOpen: false,
  lessonToEdit: "",
  afterEdit:"",
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

export const deleteLessonRequest = createAsyncThunk(
  "lesson/deleteLessonRequest",
  async (lessonId, thunkAPI) => {
    try {
      const resp = await axios.delete(`/lessons/${lessonId}`);
      thunkAPI.dispatch(deleteLessonSuccess(lessonId))
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteLessonSuccess = createAction("lesson/deleteLessonSuccess");

export const cancelEnrollmentSuccess = createAction(
  "lesson/cancelEnrollmentSuccess"
);

export const editEnrollmentStatusSuccess = createAction(
  "lesson/editEnrollmentStatusSuccess"
);

export const addEnrollmentStatusSuccess = createAction(
  "lesson/addEnrollmentStatusSuccess"
);

export const getLessonById = createAsyncThunk(
  "lesson/getLessonById",
  async (lessonId, thunkAPI) => {
    try {
      const resp = await axios(`/lessons/${lessonId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editLessonRequest = createAsyncThunk(
  "lesson/editLessonRequest",
  async (lessonInfo, thunkAPI) => {
    const lessonId = lessonInfo.id;
    try {
      const resp = await axios.patch(`/lessons/${lessonId}`, lessonInfo);
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
      state.lessonPopAnchorEl = action.payload;
    },
    openLessonPop: (state) => {
      state.isLessonPopOpen = true;
    },
    closeLessonPop: (state) => {
      state.isLessonPopOpen = false;
    },
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
        state.currentCal = action.payload;
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
        state.currentCal = action.payload;
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
        state.currentCal = action.payload;
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
      })
      .addCase(deleteLessonRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLessonRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteLessonRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteLessonSuccess, (state, action) => {
        const deletedLessonId = action.payload;
        state.myLessons = state.myLessons.filter(
          (lesson) => lesson.id !== deletedLessonId
        );
        state.currentCal = state.currentCal.filter(
          (lesson) => lesson.id !== deletedLessonId
        );
      })
      .addCase(cancelEnrollmentSuccess, (state, action) => {
        const [lessonId, enrollmentId] = action.payload;
        const lesson1 = state.myLessons.find((lesson) => lesson.id === lessonId);
        if (lesson1) {
          lesson1.enrollments = lesson1.enrollments.filter(
            (enrollment) => enrollment.id !== enrollmentId
          );
        }
        const lesson2 = state.currentCal.find((lesson) => lesson.id === lessonId);
        if (lesson2) {
          lesson2.enrollments = lesson2.enrollments.filter(
            (enrollment) => enrollment.id !== enrollmentId
          );
        }
      })
      .addCase(editEnrollmentStatusSuccess, (state, action) => {
        const [lessonId, enrollmentId, data] = action.payload;
        const lesson = state.myLessons.find((lesson) => lesson.id === lessonId);
        if (lesson) {
          lesson.enrollments = lesson.enrollments.map((enrollment) => {
            if (enrollment.id === enrollmentId) {
              return {
                ...enrollment,
                ...(data || {}),
              };
            }
            return enrollment;
          });
        }
      })
      .addCase(addEnrollmentStatusSuccess, (state, action) => {
       const [lessonId, newEnrollment] = action.payload;
       const lesson = state.currentCal.find((lesson) => lesson.id === lessonId);
       if (lesson) {
        lesson.enrollments = [...lesson.enrollments, newEnrollment]
       }
      })
      .addCase(getLessonById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLessonById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lessonToEdit = action.payload;
        state.error = null;
      })
      .addCase(getLessonById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editLessonRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editLessonRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.afterEdit = action.payload;
        state.error = null;
      })
      .addCase(editLessonRequest.rejected, (state, action) => {
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
  closeLessonPop,
  // setLessonPopInfo,
} = lessonSlice.actions;
export default lessonSlice.reducer;
