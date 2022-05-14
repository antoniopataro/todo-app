import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "currentPath",
  initialState: { currentPath: "/" },
  reducers: {
    changePath: (state, { payload }) => {
      return { ...state, currentPath: payload };
    },
  },
});

export const { changePath } = slice.actions;

export const selectContent = (state) => state.currentPath;

export default slice.reducer;
