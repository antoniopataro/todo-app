import { createSlice } from "@reduxjs/toolkit";

import MenuList from "../components/Sidebar/Menu/initialMenuList";

const getInitialState = () => {
  const parsedLocalStorage = JSON.parse(localStorage.getItem("userTypes"));
  if (parsedLocalStorage == undefined) {
    return MenuList;
  }
  return parsedLocalStorage;
};

export const slice = createSlice({
  name: "tasksSlice",
  initialState: { typesList: getInitialState() },
  reducers: {
    appendType: (state, { payload }) => {
      localStorage.setItem(
        "userTypes",
        JSON.stringify([...state.typesList, payload])
      );

      return { ...state, typesList: [...state.typesList, payload] };
    },
    removeType: (state, { payload }) => {
      const newList = [...state.typesList].filter((task) => {
        if (task.uuid === payload) {
          return;
        }
        return task;
      });

      localStorage.setItem("userTypes", JSON.stringify(newList));

      return { ...state, typesList: newList };
    },
  },
});

export const { appendType, removeType } = slice.actions;

export const selectContent = (state) => state.typesList;

export default slice.reducer;
