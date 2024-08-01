import  defaultImage  from "@/Assets/Images/NoImage5.png";
import { UserDetails } from "@/Redux/Features/Admin/Users/GetUserDetailsSlice";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Navbar.module.scss";
console.log(defaultImage);
const Navbar = ({ showDrawer }: any) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    getData();
  }, [dispatch]);

  const getData = async () => {
    // @ts-ignore
    const element = await dispatch(UserDetails(userId));
    // @ts-ignore
    setUserData(element.payload.data.user);
  };

  return (
    <>
      <AppBar position="static" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { sm: "none" }, color: "black" }}>
              <IconButton
                onClick={() => {
                  showDrawer();
                }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box className="navAvatar">
              <Tooltip title="Open settings">
                <IconButton>
                  <img
                    crossOrigin="anonymous"
                    className="nav-img"
                    src={
                      userData?.profileImage == null 
                        ? defaultImage
                        : `https://upskilling-egypt.com:3000/` +
                        userData?.profileImage
                    }
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Box className="navInfo">
              <Typography variant="caption" color="initial">
                {userData?.userName}
              </Typography>
              <Typography variant="caption" color="initial">
                {userData?.email}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
