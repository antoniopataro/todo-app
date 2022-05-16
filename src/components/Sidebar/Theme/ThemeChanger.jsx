import { useEffect, useState } from "react";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../redux/themeSlice";

import { motion } from "framer-motion";

import lightThemeIcon from "../../../assets/theme-icons/lightThemeIcon.svg";
import darkThemeIcon from "../../../assets/theme-icons/darkThemeIcon.svg";
import blackThemeIcon from "../../../assets/theme-icons/blackThemeIcon.svg";

const ThemeChagerContainer = styled.div`
  display: flex;
  flex-direction: column;

  z-index: 2;

  width: 100%;

  gap: 20px;

  #theme-label {
    color: ${(props) => props.theme.textColor};
  }

  #themes-box {
    display: flex;
    flex-direction: row;

    width: 100%;
    height: fit-content;

    align-items: center;
    justify-content: space-between;

    gap: 5px;
    padding: 5px 5px;

    border-radius: 10px;

    background-color: ${(props) => props.theme.primaryColor};
  }

  .theme-item {
    display: flex;
    flex-direction: row;

    z-index: 1;

    width: 100%;
    height: 30px;

    align-items: center;
    justify-content: center;

    gap: 10px;

    border-radius: 5px;

    cursor: pointer;

    color: ${(props) => props.theme.textColor};
    background-color: transparent;

    img,
    .theme-name {
      pointer-events: none;

      -webkit-filter: ${(props) => props.theme.svgInvertColorAmount};
      filter: ${(props) => props.theme.svgInvertColorAmount};
    }

    :hover {
      background-color: #fff;
    }
  }

  #active-theme-indicator {
    position: absolute;

    z-index: 0;

    height: 30px;

    border-radius: 5px;

    background-color: #fff;
  }
`;

function ThemeChager() {
  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme.currentTheme);

  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState();

  const handleChangeTheme = (theme, target) => {
    dispatch(changeTheme(theme));
    updateIndicatorStyle(target);
  };

  const updateIndicatorStyle = (target) => {
    const start = document.getElementById("active-theme-indicator-start");

    if (target) {
      setIndicatorX(target.offsetLeft - start.offsetLeft);
      setIndicatorWidth(target.offsetWidth);
      return;
    }

    setIndicatorWidth(start.offsetWidth);
  };

  useEffect(() => {
    updateIndicatorStyle();
    window.addEventListener("resize", () => updateIndicatorStyle());
  }, []);

  return (
    <ThemeChagerContainer theme={themeState}>
      <div id="theme-label">Theme</div>
      <div id="themes-box">
        <div
          id="active-theme-indicator-start"
          className="theme-item"
          onClick={(e) => handleChangeTheme("light", e.target)}
        >
          <img src={lightThemeIcon} alt="Light Theme" width={15} />
          <div className="theme-name">Light</div>
        </div>
        <div
          className="theme-item"
          onClick={(e) => handleChangeTheme("dark", e.target)}
        >
          <img src={darkThemeIcon} alt="Dark Theme" width={15} />
          <div className="theme-name">Dark</div>
        </div>
        <div
          className="theme-item"
          onClick={(e) => handleChangeTheme("black", e.target)}
        >
          <img src={blackThemeIcon} alt="Black Theme" width={15} />
          <div className="theme-name">Black</div>
        </div>
        <motion.div
          animate={{ x: indicatorX, width: indicatorWidth }}
          transition={{ ease: "easeOut" }}
          id="active-theme-indicator"
        ></motion.div>
      </div>
    </ThemeChagerContainer>
  );
}

export default ThemeChager;
