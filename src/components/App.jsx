import "../styles/App.css";

import Sidebar from "./Sidebar/Sidebar";
import ToDo from "./ToDo/ToDo";

import styled from "styled-components";

import { useSelector } from "react-redux";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  background-color: ${(props) => props.theme.primaryColor};
`;

function App() {
  const themeState = useSelector((state) => state.theme.currentTheme);
  return (
    <AppContainer theme={themeState}>
      <Sidebar />
      <ToDo />
    </AppContainer>
  );
}

export default App;
