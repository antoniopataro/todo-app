import styled from "styled-components";

import Menu from "./Sidebar/Menu";
import ThemeChanger from "./Sidebar/ThemeChanger";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 33vw;
  height: calc(100vh - 4vh);

  padding: 80px 60px;
  margin: 2vh 1vw;

  justify-content: space-between;

  border-radius: 20px;

  background-color: #fff;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <Menu />
      <ThemeChanger />
    </SidebarContainer>
  );
}

export default Sidebar;
