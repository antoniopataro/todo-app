import styled from "styled-components";

import { useSelector } from "react-redux";

import Sidebar from "./Sidebar/Sidebar";
import ToDo from "./ToDo/ToDo";

import "../styles/App.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  background-color: ${(props) => props.theme.primaryColor};
`;

function App() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  return (
    <AppContainer theme={currentTheme}>
      <Sidebar />
      <ToDo />
    </AppContainer>
  );
}

export default App;
