import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lesson: "",
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    addNewLesson: (state, action) => {
      state.lesson = action.payload;
    },


  },
});

export const { addNewLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
