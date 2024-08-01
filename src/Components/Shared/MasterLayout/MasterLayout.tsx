import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../..";
import "./MasterLayout.module.scss";
import { useState } from "react";

const MasterLayout = () => {
  const [display, setDisplay] = useState("none");
  const [DrawerVariant, setDrawerVariant] = useState("permanent");

  const showDrawer = () => {
    setDisplay("block");
    setDrawerVariant("temporary");
  };

  const closeDrawer = () => {
    setDisplay("none");
    setDrawerVariant("permanent");
  };

  return (
    <>
      <Box className="containerBox">
        <Box>
          <Sidebar {...{ display, DrawerVariant, closeDrawer }} />
        </Box>

        <Box className="mainContainer">
          <Navbar {...{ showDrawer }} />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MasterLayout;
