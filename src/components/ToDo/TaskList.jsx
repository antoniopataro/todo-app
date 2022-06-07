import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { completeTask, removeTask } from "../../redux/tasksSlice";

import { motion } from "framer-motion";

import trashIcon from "../../assets/trashIcon.svg";

const TaskListContainer = styled.ul`
  display: flex;
  flex-direction: column;

  width: 40vw;

  gap: 10px;

  .task-card {
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 60px;

    align-items: center;
    justify-content: space-between;

    padding: 20px;

    border-radius: 20px;

    color: ${(props) => props.theme.textColor};

    background-color: ${(props) => props.theme.secondaryColor};
  }

  .task-card-left {
    display: flex;
    flex-direction: row;

    width: 100%;

    align-items: center;

    word-break: break-all;
    overflow: hidden;

    gap: 20px;
  }

  .task-card-right {
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 20px;
  }

  .task-content {
    width: 100%;

    padding-right: 20px;
  }

  button {
    border: none;
    outline: none;
  }

  .complete-task-button {
    width: 20px;
    height: 20px;

    border-radius: 5px;

    cursor: pointer;

    background-color: ${(props) => props.theme.primaryColor};

    :hover {
      background-color: ${(props) => props.theme.hoveredInputColor};
    }
  }

  .remove-task-button {
    height: 40px;
    width: 40px;

    border-radius: 50px;

    cursor: pointer;

    -webkit-filter: ${(props) => props.theme.svgInvertColorAmount};
    filter: ${(props) => props.theme.svgInvertColorAmount};

    background-color: transparent;

    img {
      pointer-events: none;
    }
  }

  .remove-task-button:hover {
    background-color: ${(props) => props.theme.hoveredInputColor};
  }

  #complete-task-indicator {
    position: absolute;

    margin: 0 35px;

    height: 1px;

    background-color: #000000;
  }
`;

function TaskList() {
  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme.currentTheme);
  const taskList = useSelector((state) => state.tasks.taskList);
  const currentPath = useSelector((state) => state.path.currentPath);

  const filteredTaskList = taskList
    .slice(0)
    .reverse()
    .filter((task) => {
      if (currentPath === "/") {
        return task;
      } else if (task.path === currentPath) {
        return task;
      } else {
        return;
      }
    });

  const handleCompleteTask = (e) => {
    const storagedTasks = JSON.parse(localStorage.getItem("userTasks"));

    storagedTasks.map((task) => {
      if (task.uuid === e.target.id) {
        if (task.isDone) {
          task.isDone = false;
        } else {
          task.isDone = true;
        }
      }
      return;
    });

    dispatch(completeTask(storagedTasks));
    localStorage.setItem("userTasks", JSON.stringify(storagedTasks));
    updateIndicatorWidth();
  };

  const handleRemoveTask = (e) => {
    dispatch(removeTask(e.target.id));
  };

  const taskContentRef = useRef(null);

  const [indicatorWidth, setIndicatorWidth] = useState();

  function updateIndicatorWidth() {
    if (!taskContentRef.current) {
      return;
    }

    const taskContentRect = taskContentRef.current.getBoundingClientRect();

    setIndicatorWidth(taskContentRect.width - 20);
  }

  useEffect(() => {
    updateIndicatorWidth();
    window.addEventListener("resize", updateIndicatorWidth);
  }, []);

  return (
    <TaskListContainer theme={themeState}>
      {filteredTaskList.map((task, index) => (
        <motion.li
          className="task-card"
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            backgroundColor: task.isDone ? themeState.inactiveInputColor : "",
          }}
        >
          <motion.div
            id="complete-task-indicator"
            initial={{ width: 0 }}
            animate={{ width: task.isDone ? indicatorWidth : 0 }}
          ></motion.div>
          <div className="task-card-left">
            <button
              id={task.uuid}
              className="complete-task-button"
              onClick={(e) => handleCompleteTask(e)}
              style={{
                backgroundColor: task.isDone ? themeState.textColor : "",
              }}
            ></button>
            <div ref={taskContentRef} className="task-content">
              {task.content}
            </div>
          </div>
          <div className="task-card-right">
            <img src={task.icon} alt="Task Type" width={15} />
            <button
              id={task.uuid}
              className="remove-task-button"
              onClick={(e) => handleRemoveTask(e)}
            >
              <img src={trashIcon} alt="Remove Task" width={15} />
            </button>
          </div>
        </motion.li>
      ))}
    </TaskListContainer>
  );
}

export default TaskList;
