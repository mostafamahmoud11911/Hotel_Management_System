import { useLocation } from "react-router-dom";
import "./AuthBackground.module.scss";
import { Box, Typography } from "@mui/material";

const AuthBackground = () => {
  const { pathname } = useLocation();
  const backgroundImage =
    pathname === "/login"
      ? "auth-background"
      : pathname === "/register"
        ? "auth-background2"
        : pathname === "/forget-password"
          ? "auth-background3"
          : pathname === "/reset-password"
            ? "auth-background4"
            : "auth-background";
  const sectionTitle =
    pathname === "/login" || pathname === "/"
      ? "Sign in to Roamhome"
      : pathname === "/register"
        ? "Sign up to Roamhome"
        : pathname === "/forget-password"
          ? "Forgot password"
          : pathname === "/reset-password"
            ? "Reset Password"
            : null;
  const sectionDesc =
    pathname === "/login" || pathname === "/"
      ? "Homes as unique as you."
      : pathname === "/register"
        ? "Homes as unique as you."
        : pathname === "/forget-password"
          ? "Homes as unique as you."
          : pathname === "/reset-password"
            ? "Homes as unique as you."
            : null;
  return (
    <>
      <Box className={`auth ${backgroundImage}`}>
        <Box className="auth-desc">
          <Typography variant="h4" >{sectionTitle}</Typography>
          <Typography >{sectionDesc}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default AuthBackground;
