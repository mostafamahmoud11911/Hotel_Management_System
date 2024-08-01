/** @format */

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./NavBar.module.scss";
import { useTranslation } from "react-i18next";
import i18n from "@/locale/i18n";
import HomeIcon from "@mui/icons-material/Home";
import { Favorite } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion"
const DrawerComponent = () => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const handelLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.reload();
  };
  const MotionButton = motion(Button)
  return (
    <>
      {isMobile && (
        <>
          <IconButton edge="start" onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(!drawerOpen)}
          >
            <List className={style.navStyle}>
              <ListItem>
                <Typography
                  className={`subNav  `}
                  variant="h4"
                  component="div"
                  color="initial"
                  style={{ marginBottom: "2rem" }}
                  margin={"auto"}
                  textAlign={"center"}
                >
                  <Typography
                    variant=""
                    className={style.logo}
                    style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
                  >
                    Stay
                  </Typography>
                  cation.
                </Typography>
              </ListItem>

              <ListItem sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                {i18n.language == "ar" ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                  >
                    En
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      i18n.changeLanguage("ar");
                    }}
                  >
                    Ar
                  </Button>
                )}
                <Box
                  className={style.navArrow}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <ArrowCircleRightIcon fontSize="large" color="action" />
                </Box>
              </ListItem>
              <ListItem className={style.navSectionsSmallView}>
                <Link to="/">
                  <HomeIcon /> {t("home")}
                </Link>
              </ListItem>
              <ListItem className={style.navSectionsSmallView}>
                <Link to="/explore">
                  <SearchIcon /> {t("explore")}
                </Link>
              </ListItem>

              <ListItem className={style.navSectionsSmallView}>
                <Link to="/favorite-rooms">
                  {" "}
                  <Favorite /> {t("Favorites")}
                </Link>
              </ListItem>
              {!localStorage.getItem("authToken") ? (
                <>
                  <ListItem>
                    <MotionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.8 }}
                      className="navBtn"
                      variant="contained"
                      onClick={() => {
                        setDrawerOpen(!drawerOpen);
                        navigate("/login");
                      }}
                    >
                      Login Now
                    </MotionButton>
                  </ListItem>

                  <ListItem>
                    <MotionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.8 }}
                      className="navBtnSign"
                      variant="contained"
                      onClick={() => {
                        setDrawerOpen(!drawerOpen);
                        navigate("/register");
                      }}
                    >
                      Sign Up
                    </MotionButton>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem style={{ textAlign: "center" }}>
                    <MotionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.8 }}
                      variant="contained"
                      onClick={() => {
                        setDrawerOpen(!drawerOpen);
                        handelLogout();
                      }}
                    >
                      Logout
                    </MotionButton>
                  </ListItem>
                </>
              )}
            </List>
          </Drawer>
        </>
      )}
    </>
  );
};

export default DrawerComponent;
