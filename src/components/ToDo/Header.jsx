import styled from "styled-components";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MenuList from "../Sidebar/Menu/MenuList";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 60px;

  align-items: center;

  gap: 20px;

  margin-bottom: 80px;

  font-size: 24px;
  font-weight: 700;
`;

function Header() {
  const currentPath = useSelector((state) => state.path.currentPath);

  const [headerIcon, setHeaderIcon] = useState();
  const [headerTitle, setHeaderTitle] = useState();

  useEffect(() => {
    MenuList.forEach((item) => {
      if (item.url === currentPath) {
        setHeaderIcon(item.icon);
        setHeaderTitle(item.content);
      }
    });
  }, [currentPath]);

  return (
    <HeaderContainer>
      <img src={headerIcon} alt="List Icon" width={30} />
      <div id="header-title">{headerTitle}</div>
    </HeaderContainer>
  );
}

export default Header;
