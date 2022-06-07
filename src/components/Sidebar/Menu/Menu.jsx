import { useEffect, useState, useRef, useCallback } from "react";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { changePath } from "../../../redux/pathSlice";
import { appendType, removeType } from "../../../redux/typesSlice";

import { motion } from "framer-motion";

import { v4 as uuidv4 } from "uuid";

import addCathegoryIcon from "../../../assets/addCathegoryIcon.svg";
import blueIcon from "../../../assets/blueIcon.svg";
import trashIcon from "../../../assets/trashIcon.svg";

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
    justify-content: space-between;

    padding: 0 20px;

    list-style: none;

    cursor: pointer;

    border-radius: 20px;

    color: ${(props) => props.theme.textColor};
    background-color: transparent;

    :hover {
      background-color: ${(props) => props.theme.primaryColor};
    }

    #type-card-left {
      display: flex;
      flex-direction: row;

      gap: 20px;

      pointer-events: none;
    }

    .remove-type {
      height: 30px;
      width: 30px;

      outline: none;
      border: none;

      border-radius: 30px;

      background-color: transparent;

      filter: ${(props) => props.theme.svgInvertColorAmount};

      cursor: pointer;

      :hover {
        background-color: ${(props) => props.theme.hoveredInputColor};
      }

      img {
        pointer-events: none;
      }
    }
  }

  #active-path-indicator {
    position: absolute;

    z-index: 0;

    height: 60px;

    border-radius: 20px;

    background-color: ${(props) => props.theme.primaryColor};
  }

  #add-cathegory {
    display: flex;
    flex-direction: row;

    z-index: 1;

    height: 60px;

    align-items: center;

    padding: 0 20px;
    gap: 20px;

    border-radius: 20px;

    border: none;
    outline: none;

    white-space: nowrap;

    cursor: ${(props) => (props.isEditing ? "default" : "pointer")};

    font-family: "Poppins", sans-serif;

    color: ${(props) => props.theme.textColor};
    background-color: transparent;

    img {
      filter: ${(props) => props.theme.svgInvertColorAmount};
    }
  }

  #add-cathegory-input {
    width: 100%;
    height: 100%;

    font-family: "Inter", sans-serif;
    font-size: 16px;

    outline: none;
    border: none;

    color: ${(props) => props.theme.textColor};
    background-color: transparent;
  }

  #add-cathegory-input-inactive {
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }
`;

function Menu() {
  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme.currentTheme);
  const typesList = useSelector((state) => state.types.typesList);

  const [isEditingCathegory, setIsEditingCathegory] = useState(false);

  const handleChangePath = (url, target) => {
    dispatch(changePath(url));
    updateIndicatorStyle(target);
  };

  class Type {
    constructor(e) {
      this.content = e.target.value;
      this.url = `/${e.target.value.toLowerCase()}`;
      this.icon = blueIcon;
      this.uuid = uuidv4();
    }
  }

  const handleNewCathegory = (e) => {
    isEditingCathegory ? "" : setIsEditingCathegory(true);

    if (e && e.key === "Enter") {
      const newType = new Type(e);
      dispatch(appendType(newType));
    }
  };

  const handleRemoveType = (e) => {
    const typeTitle = e.target.parentNode.firstChild.firstChild.nextSibling;
    if (
      typeTitle === "Home" ||
      typeTitle === "Work" ||
      typeTitle === "Studies" ||
      typeTitle === "Finances"
    ) {
      return;
    }

    dispatch(removeType(e.target.id));
    setIndicatorY(0);
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setIsEditingCathegory(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const AddCathegory = ({ isEditing }) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const addCathegory = isEditing ? (
      <input
        ref={wrapperRef}
        type="text"
        id="add-cathegory-input"
        onKeyDown={(e) => handleNewCathegory(e)}
      />
    ) : (
      <div id="add-cathegory-input-inactive">Add Cathegory</div>
    );

    return <div>{addCathegory}</div>;
  };

  const [indicatorY, setIndicatorY] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  useEffect(() => {
    updateIndicatorStyle();
    window.addEventListener("resize", () => updateIndicatorStyle());
  }, []);

  const startRef = useRef(null);

  const updateIndicatorStyle = useCallback((target) => {
    const startRect = startRef.current.getBoundingClientRect();
    setIndicatorWidth(startRect.width);

    if (target) {
      const targetRect = target.getBoundingClientRect();
      setIndicatorY(targetRect.top - startRect.top);
    }
  }, []);

  return (
    <MenuListContainer
      theme={themeState}
      isEditing={isEditingCathegory}
      ref={startRef}
    >
      {typesList.map((item, index) => (
        <li
          id={index === 0 ? "active-path-indicator-start" : ""}
          key={index}
          className="menu-item"
          onClick={(e) => handleChangePath(item.url, e.target)}
        >
          <div id="type-card-left">
            <img src={item.icon} alt="Menu Icon" width={15} />
            <div>{item.content}</div>
          </div>
          <button
            className="remove-type"
            id={item.uuid}
            onClick={(e) => handleRemoveType(e)}
          >
            <img
              src={trashIcon}
              className="remove-type-img"
              alt="Remove Type"
              width={15}
            />
          </button>
        </li>
      ))}

      <motion.button
        id="add-cathegory"
        onClick={() => {
          handleNewCathegory();
        }}
        animate={{
          width: isEditingCathegory ? "100%" : "fit-content",
        }}
        whileHover={{ backgroundColor: themeState.primaryColor }}
        transition={{ ease: "easeOut" }}
      >
        <img src={addCathegoryIcon} alt="Cathegory" width={15} />
        <AddCathegory isEditing={isEditingCathegory} />
      </motion.button>

      <motion.div
        animate={{ y: indicatorY, width: indicatorWidth }}
        transition={{ ease: "easeOut" }}
        id="active-path-indicator"
      ></motion.div>
    </MenuListContainer>
  );
}

export default Menu;
