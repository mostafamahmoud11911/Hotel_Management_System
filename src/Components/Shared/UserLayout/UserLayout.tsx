import { NavBar, Footer } from "@/Components";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <Box dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <NavBar />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
};

export default UserLayout;
