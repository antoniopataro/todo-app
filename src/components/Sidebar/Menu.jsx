import { useEffect, useState } from "react";

import styled from "styled-components";

import { useDispatch } from "react-redux";
import { changePath } from "../../redux/pathSlice";

import { motion } from "framer-motion";

import MenuList from "../MenuList";

const MenuListContainer = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 20px;

  .menu-item {
    display: flex;
    flex-direction: row;

    z-index: 1;

    width: 100%;
    height: 60px;

    align-items: center;

    gap: 20px;

    padding: 0 20px;

    list-style: none;

    cursor: pointer;

    border-radius: 20px;

    background-color: transparent;

    :hover {
      background-color: #eaedee;
    }
  }

  #active-path-indicator {
    position: absolute;

    z-index: 0;

    height: 60px;

    border-radius: 20px;

    background-color: #eaedee;
  }
`;

function Menu() {
  const dispatch = useDispatch();

  const [indicatorY, setIndicatorY] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const handleChangePath = (url, target) => {
    const start = document.getElementById("active-path-indicator-start");

    setIndicatorY(target.offsetTop - start.offsetTop);
    setIndicatorWidth(start.offsetWidth);

    dispatch(changePath(url));
  };

  useEffect(() => {
    const start = document.getElementById("active-path-indicator-start");
    setIndicatorWidth(start.offsetWidth);
  }, []);

  return (
    <MenuListContainer>
      {MenuList.map((item, index) => (
        <li
          id={index === 0 ? "active-path-indicator-start" : ""}
          key={index}
          className="menu-item"
          onClick={(e) => handleChangePath(item.url, e.target)}
        >
          <img src={item.icon} alt="Menu Icon" width={15} />
          <div>{item.content}</div>
        </li>
      ))}
      <motion.div
        animate={{ y: indicatorY, width: indicatorWidth }}
        id="active-path-indicator"
      ></motion.div>
    </MenuListContainer>
  );
}

export default Menu;
