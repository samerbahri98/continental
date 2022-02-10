import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import SideMenuList from "./SideMenu/SideMenuList";
import Navbar from "./Navbar";

const drawerWidth = 240;

interface IDashboardPageProps extends React.PropsWithChildren<{}> {
  title: string;
}
export default function DashboardPage({
  children,
  title,
}: IDashboardPageProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar title={title} />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <SideMenuList />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
