import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import pathReducer from "./pathSlice";
import themeReducer from "./themeSlice";
import tasksReducer from "./tasksSlice.js";

export default configureStore({
  reducer: {
    path: pathReducer,
    theme: themeReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
