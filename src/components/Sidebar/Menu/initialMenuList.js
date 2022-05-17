import homeIcon from "../../../assets/homeIcon.svg";
import redIcon from "../../../assets/redIcon.svg";
import purpleIcon from "../../../assets/purpleIcon.svg";
import greenIcon from "../../../assets/greenIcon.svg";

import { v4 as uuidv4 } from "uuid";

const MenuList = [
  {
    content: "Home",
    url: "/",
    icon: homeIcon,
    id: uuidv4(),
  },
  {
    content: "Work",
    url: "/work",
    icon: redIcon,
    id: uuidv4(),
  },
  {
    content: "Studies",
    url: "/studies",
    icon: purpleIcon,
    id: uuidv4(),
  },
  {
    content: "Finances",
    url: "/finances",
    icon: greenIcon,
    id: uuidv4(),
  },
];

export default MenuList;
