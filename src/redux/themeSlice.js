import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "tasksSlice",
  initialState: { themeSlice: "/" },
  reducers: {
    changePath: (state, { payload }) => {
      return { ...state, themeSlice: payload };
    },
  },
});

export const { changeTheme } = slice.actions;

export const selectContent = (state) => state.currentTheme;

export default slice.reducer;
