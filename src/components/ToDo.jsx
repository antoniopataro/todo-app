import styled from "styled-components";

import Header from "./ToDo/Header";
import TaskWritter from "./ToDo/TaskWritter.jsx";
import TaskList from "./ToDo/TaskList.jsx";

const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 60vw;
  height: calc(100vh - 4vh);

  gap: 20px;

  padding: 80px 60px;
  margin: 2vh 0;
`;

function ToDo() {
  return (
    <ToDoContainer>
      <Header />
      <TaskWritter />
      <TaskList />
    </ToDoContainer>
  );
}

export default ToDo;
