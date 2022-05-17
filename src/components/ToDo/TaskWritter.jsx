import { useState } from "react";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { appendTask } from "../../redux/tasksSlice";

import { v4 as uuidv4 } from "uuid";

import homeIcon from "../../assets/homeIcon.svg";
import blueIcon from "../../assets/blueIcon.svg";
import redIcon from "../../assets/redIcon.svg";
import purpleIcon from "../../assets/purpleIcon.svg";
import greenIcon from "../../assets/greenIcon.svg";

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

  background-color: ${(props) => props.theme.inactiveInputColor};

  :hover {
    background-color: ${(props) => props.theme.hoveredInputColor};
  }

  :focus-within {
    background-color: ${(props) => props.theme.secondaryColor};
    box-shadow: 0px 8px 8px ${(props) => props.theme.boxShadowColor};
  }

  #text-writter-input {
    border: none;
    outline: none;

    width: 100%;
    height: 40px;

    font-family: "Poppins", sans-serif;
    font-size: 16px;

    color: ${(props) => props.theme.textColor};

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

    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.secondaryColor};

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    :focus {
      outline: 1px solid #bbbbbb;
    }
    :hover {
      outline: 1px solid #bbbbbb;
    }

    .task-writter-selector-option {
      color: ${(props) => props.theme.textColor};
      background-color: ${(props) => props.theme.secondaryColor};
    }
  }
`;

function TaskWritter() {
  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme.currentTheme);
  const typesList = useSelector((state) => state.types.typesList);

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
        return homeIcon;
      case "/work":
        return redIcon;
      case "/studies":
        return purpleIcon;
      case "/finances":
        return greenIcon;
      default:
        return blueIcon;
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
    <TaskWritterContainer theme={themeState}>
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
        {typesList.map((type, index) => (
          <option
            className="task-writter-selector-option"
            key={index}
            value={type.url}
          >
            {type.content}
          </option>
        ))}
        ;
      </select>
    </TaskWritterContainer>
  );
}

export default TaskWritter;
