import styled from "styled-components";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 60px;

  align-items: center;

  gap: 20px;

  margin-bottom: 80px;

  font-size: 24px;
  font-weight: 700;

  img {
    filter: ${(props) =>
      props.title === "Home" ? props.theme.svgInvertColorAmount : ""};
  }
`;

function Header() {
  const currentPath = useSelector((state) => state.path.currentPath);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const typesList = useSelector((state) => state.types.typesList);

  const [headerIcon, setHeaderIcon] = useState();
  const [headerTitle, setHeaderTitle] = useState();

  useEffect(() => {
    typesList.forEach((item) => {
      if (item.url === currentPath) {
        setHeaderIcon(item.icon);
        setHeaderTitle(item.content);
      }
    });
  }, [currentPath]);

  return (
    <HeaderContainer theme={currentTheme} title={headerTitle}>
      <img src={headerIcon} alt="List Icon" width={30} />
      <div id="header-title">{headerTitle}</div>
    </HeaderContainer>
  );
}

export default Header;
