import { Box, List, ListItem, Typography } from "@mui/material";
import "./Footer.module.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box className="footerContainer">
        <Box className="mainPart">
          <Typography
            className="subNav"
            variant="h4"
            component="div"
            color="initial"
          >
            <Typography variant="" className="blueColor">
              Stay
            </Typography>
            cation.
          </Typography>
          <Typography className="subPara">{t("footerDes")}</Typography>
        </Box>

        <List className="footerList">
          <ListItem className="listHead">{t("forBeginners")}</ListItem>
          <ListItem className="listChild">{t("NewAccount")}</ListItem>
          <ListItem className="listChild">{t("StartBookingARoom")}</ListItem>
          <ListItem className="listChild">{t("UsePayments")}</ListItem>
        </List>

        <List className="footerList">
          <ListItem className="listHead">{t("ExploreUs")}</ListItem>
          <ListItem className="listChild">{t("OurCareers")}</ListItem>
          <ListItem className="listChild">{t("Privacy")}</ListItem>
          <ListItem className="listChild">{t("Terms&Conditions")}</ListItem>
        </List>

        <List className="footerList">
          <ListItem className="listHead">{t("ConnectUs")}</ListItem>
          <ListItem className="listChild">upskilling.eg1@gmail.com</ListItem>
          <ListItem className="listChild">011 - 5493 - 2137</ListItem>
          <ListItem className="listChild">Upskilling , Egypt , Giza</ListItem>
        </List>
      </Box>
      <Box className="FooterCreatedBy">
        Created By{" "}
        <Typography
          variant=""
          className="links"
          onClick={() =>
            window.open("https://www.linkedin.com/in/mostafa-mahmoud-670794258/")
          }
        >
          Mostafa Mahmoud
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
