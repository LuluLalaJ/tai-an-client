import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  isLoading: true,
  error: null,
};

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async (teacherId, thunkAPI) => {
    try {
      const resp = await axios(`/teachers/${teacherId}/students`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const cancelStudentEnrollmentSuccess = createAction(
  "students/cancelStudentEnrollmentSuccess"
);

export const editStudentEnrollmentSuccess = createAction(
  "students/editStudentEnrollmentSuccess"
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
        state.error = null;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editStudentEnrollmentSuccess, (state, action) => {
        const [enrollmentId, data] = action.payload;
        state.students = state.students.map((student) => {
          if (
            student.enrollments.some(
              (enrollment) => enrollment.id === enrollmentId
            )
          ) {
            const updatedEnrollments = student.enrollments.map((enrollment) => {
              if (enrollment.id === enrollmentId) {
                return { ...enrollment, ...data };
              }
              return enrollment;
            });
            return { ...student, enrollments: updatedEnrollments };
          }
          return student;
        });
      })
      .addCase(cancelStudentEnrollmentSuccess, (state, action) => {
        const enrollmentId = action.payload;
        state.students = state.students.map((student) => {
          if (
            student.enrollments.some(
              (enrollment) => enrollment.id === enrollmentId
            )
          ) {
            const updatedEnrollments = student.enrollments.filter(
              (enrollment) => {
                return enrollment.id !== enrollmentId;
              }
            );
            return { ...student, enrollments: updatedEnrollments };
          }
          return student;
        });
      });
  },
});

export default studentsSlice.reducer;
