import { createSlice } from "@reduxjs/toolkit";

const lightTheme = {
  primaryColor: "#eaedee",
  secondaryColor: "#fff",
  inactiveInputColor: "#dfdfdf",
  hoveredInputColor: "#d9dee5",
  activeInputColor: "#fff",
  boxShadowColor: "#dddfe1",
  textColor: "#000000",
  svgInvertColorAmount: "invert(0%)",
};
const darkTheme = {
  primaryColor: "#1E2023",
  secondaryColor: "#303238",
  inactiveInputColor: "#46484E",
  hoveredInputColor: "#3A3B3F",
  activeInputColor: "#fff",
  boxShadowColor: "#00000042",
  textColor: "#fff",
  svgInvertColorAmount: "invert(50%)",
};
const blackTheme = {
  primaryColor: "#000000",
  secondaryColor: "#181A1C",
  inactiveInputColor: "#1C1F20",
  hoveredInputColor: "#313337",
  activeInputColor: "#fff",
  boxShadowColor: "#00000082",
  textColor: "#fff",
  svgInvertColorAmount: "invert(50%)",
};

export const slice = createSlice({
  name: "themeSlice",
  initialState: { currentTheme: lightTheme },
  reducers: {
    changeTheme: (state, { payload }) => {
      switch (payload) {
        case "light":
          return { ...state, currentTheme: lightTheme };
        case "dark":
          return { ...state, currentTheme: darkTheme };
        case "black":
          return { ...state, currentTheme: blackTheme };
      }
    },
  },
});

export const { changeTheme } = slice.actions;

export const selectContent = (state) => state.currentTheme;

export default slice.reducer;
