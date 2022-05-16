import styled from "styled-components";

import { useSelector } from "react-redux";

import Menu from "./Menu/Menu";
import ThemeChanger from "./Theme/ThemeChanger";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 33vw;
  height: calc(100vh - 4vh);

  padding: 80px 60px;
  margin: 2vh 1vw;

  justify-content: space-between;

  border-radius: 20px;

  background-color: ${(props) => props.theme.secondaryColor};
`;

function Sidebar() {
  const themeState = useSelector((state) => state.theme.currentTheme);

  return (
    <SidebarContainer theme={themeState}>
      <Menu />
      <ThemeChanger />
    </SidebarContainer>
  );
}

export default Sidebar;
