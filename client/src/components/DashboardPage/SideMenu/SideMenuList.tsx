import React from "react";
import List from "@mui/material/List";
import StorageIcon from "@mui/icons-material/Storage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUpload from "@mui/icons-material/CloudUpload";
import { useLocation } from 'react-router-dom'
import SideMenuItem from "./SideMenuItem";

const routes = [
  { text: "Dashboard", link: "/", Icon: DashboardIcon },
  { text: "Containers", link: "/containers", Icon: StorageIcon },
  { text: "Deploy", link: "/deploy", Icon: CloudUpload },
];

function SideMenuList() {
  const location = useLocation();
  return (
    <List>
      {routes.map((route, index) => (
        <SideMenuItem
          text={route.text}
          link={route.link}
          Icon={route.Icon}
          selected={location.pathname === route.link}
        />
      ))}
    </List>
  );
}

export default SideMenuList;
