import { createSlice } from "@reduxjs/toolkit";

const initialTaskListState = () => {
  const storagedTasks = JSON.parse(localStorage.getItem("userTasks"));

  if (!storagedTasks) {
    return [];
  }
  return storagedTasks;
};

export const slice = createSlice({
  name: "tasksSlice",
  initialState: { taskList: initialTaskListState() },
  reducers: {
    appendTask: (state, { payload }) => {
      localStorage.setItem(
        "userTasks",
        JSON.stringify([...state.taskList, payload])
      );
      return { ...state, taskList: [...state.taskList, payload] };
    },
    completeTask: (state, { payload }) => {
      return { ...state, taskList: payload };
    },

    removeTask: (state, { payload }) => {
      const newList = [...state.taskList].filter((task) => {
        if (task.uuid === payload) {
          return;
        }
        return task;
      });

      localStorage.setItem("userTasks", JSON.stringify(newList));
      return {
        ...state,
        taskList: newList,
      };
    },
  },
});

export const { appendTask, completeTask, removeTask } = slice.actions;

export const selectContent = (state) => state.taskList;

export default slice.reducer;
