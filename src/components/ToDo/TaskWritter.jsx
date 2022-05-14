import styled from "styled-components";

import { appendTask } from "../../redux/tasksSlice";
import { useDispatch } from "react-redux";

import { useState } from "react";

const TaskWritterContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 60px;
  width: 100%;

  gap: 20px;
  padding: 20px;

  align-items: center;
  justify-content: space-between;

  border-radius: 20px;

  background-color: #dfdfdf;

  :hover {
    background-color: #d9dee5;
  }

  :focus-within {
    background-color: #ffff;
    box-shadow: 0px 8px 8px #dddfe1;
  }

  #text-writter-input {
    border: none;
    outline: none;

    width: 100%;
    height: 40px;

    font-family: "Poppins", sans-serif;
    font-size: 16px;

    background-color: transparent;
  }

  #task-writter-selector {
    display: flex;

    width: 150px;
    height: 30px;

    align-items: center;

    padding: 0 10px;

    border: none;
    outline: none;
    border-radius: 10px;
  }
`;

import { v4 as uuidv4 } from "uuid";

import blueIcon from "../../assets/blueIcon.svg";
import redIcon from "../../assets/redIcon.svg";
import purpleIcon from "../../assets/purpleIcon.svg";
import greenIcon from "../../assets/greenIcon.svg";

function TaskWritter() {
  const dispatch = useDispatch();

  const [taskPath, setTaskPath] = useState("/");

  class Task {
    constructor(e) {
      this.content = e.target.value;
      this.path = taskPath;
      this.icon = handleTaskIcon();
      this.uuid = uuidv4();
      this.isDone = false;
    }
  }

  const handleTaskIcon = () => {
    switch (taskPath) {
      case "/":
        return blueIcon;
      case "/work":
        return redIcon;
      case "/studies":
        return purpleIcon;
      case "/finances":
        return greenIcon;
      default:
        return;
    }
  };

  const handleNewTask = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    const newTask = new Task(e);

    dispatch(appendTask(newTask));

    e.target.value = "";
  };

  return (
    <TaskWritterContainer>
      <input
        type="text"
        name="task-input"
        id="text-writter-input"
        onKeyDown={(e) => handleNewTask(e)}
      />
      <select
        name="task-typee"
        id="task-writter-selector"
        onChange={(e) => setTaskPath(e.target.value)}
      >
        <option value="/">Home</option>;<option value="/work">Work</option>;
        <option value="/studies">Studies</option>;
        <option value="/finances">Finances</option>;
      </select>
    </TaskWritterContainer>
  );
}

export default TaskWritter;
