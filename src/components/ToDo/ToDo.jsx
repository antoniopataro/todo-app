import styled from "styled-components";

import { useSelector } from "react-redux";

import Header from "./Header";
import TaskWritter from "./TaskWritter.jsx";
import TaskList from "./TaskList.jsx";

const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 64vw;
  height: calc(100vh - 4vh);

  align-items: center;

  gap: 20px;

  padding: 80px 60px;
  margin: 2vh 0;

  color: ${(props) => props.theme.textColor};
`;

function ToDo() {
  const themeState = useSelector((state) => state.theme.currentTheme);

  return (
    <ToDoContainer theme={themeState}>
      <Header />
      <TaskWritter />
      <TaskList />
    </ToDoContainer>
  );
}

export default ToDo;
