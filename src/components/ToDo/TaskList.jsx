import { useDispatch, useSelector } from "react-redux";
import { completeTask, removeTask } from "../../redux/tasksSlice";

import styled from "styled-components";

import { motion } from "framer-motion";

import trashIcon from "../../assets/trashIcon.svg";

const TaskListContainer = styled.ul`
  display: flex;
  flex-direction: column;
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

    background-color: #ffffff;
  }

  .task-card-left,
  .task-card-right {
    display: flex;
    flex-direction: row;

    gap: 20px;
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

    :hover {
      background-color: #d9dee5;
    }
  }

  .remove-task-button {
    height: 40px;
    width: 40px;

    border-radius: 50px;

    cursor: pointer;

    background-color: transparent;
  }

  .remove-task-button:hover {
    background-color: #d9dee5;
  }

  .active {
    text-decoration: line-through;
  }
`;

function TaskList() {
  const dispatch = useDispatch();

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

  const handleRemoveTask = (e) => {
    dispatch(removeTask(e.target.id));
  };

  const handleCompleteTask = (e) => {
    const parsedLocalStorage = JSON.parse(localStorage.getItem("userTasks"));

    parsedLocalStorage.map((task) => {
      if (task.uuid === e.target.id) {
        if (task.isDone) {
          task.isDone = false;
        } else {
          task.isDone = true;
        }
      }
      return;
    });

    localStorage.setItem("userTasks", JSON.stringify(parsedLocalStorage));

    dispatch(completeTask(parsedLocalStorage));
  };

  return (
    <TaskListContainer>
      {filteredTaskList.map((task, index) => (
        <motion.li
          className="task-card"
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="task-card-left">
            <button
              id={task.uuid}
              className="complete-task-button"
              onClick={(e) => handleCompleteTask(e)}
            ></button>
            <div className={task.isDone ? "active" : ""}>{task.content}</div>
          </div>
          <div className="task-card-right">
            <img src={task.icon} alt="Task Type" width={15} />
            <button
              className="remove-task-button"
              onClick={(e) => handleRemoveTask(e)}
            >
              <img
                src={trashIcon}
                id={task.uuid}
                alt="Remove Task"
                width={15}
              />
            </button>
          </div>
        </motion.li>
      ))}
    </TaskListContainer>
  );
}

export default TaskList;
