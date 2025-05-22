import { useLocation } from "react-router";
import login from "../../../assets/Images/bg1.png"
import register from "../../../assets/Images/bg2.png"
import forget from "../../../assets/Images/bg3.png"
import { Box, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";



export default function AuthBackground() {
  const { pathname } = useLocation();

  let image = ""

  switch (pathname) {
    case "/register":
      image = register;
      break;
    case "/login":
      image = login;
      break;
    case "/forgetpass":
      image = forget;
      break;
    case "/resetpass":
      image = forget;
      break;
  }

  const sectionTitle =
    pathname === "/login"
      ? "Sign in to Roamhome"
      : pathname === "/register"
        ? "Sign up to Roamhome"
        : pathname === "/forgetpass"
          ? "Forgot password"
          : pathname === "/resetpass"
            ? "Reset Password"
            : null;


  const sectionDesc =
    pathname === "/login"
      ? "Homes as unique as you."
      : pathname === "/register"
        ? "Homes as unique as you."
        : pathname === "/forgetpass"
          ? "Homes as unique as you."
          : pathname === "/resetpass"
            ? "Homes as unique as you."
            : null;


  return (
    <Box sx={{ height: "100vh", py: 1, position: "relative" }}>
      <LazyLoadImage src={image} effect="blur" loading="eager" width={"100%"} height={"100%"} style={{ objectFit: "cover", borderRadius: "15px 0 0 15px" }} alt="Auth Background" />
      <Box sx={{position: "absolute", bottom: "10%", left: "10%", color: "white"}}>
        <Typography variant="h5" sx={{ color: "primary", fontWeight: "bold" }}>
          {sectionTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "primary" }}>
          {sectionDesc}
        </Typography>
      </Box>
    </Box>
  )
}
