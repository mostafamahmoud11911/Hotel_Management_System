import './UsersReview.module.scss'
import { photo } from "@/Assets/Images";
import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useTranslation } from "react-i18next";
const UsersReview = () => {
  const { t } = useTranslation();
  return <>
    <Box component="section" className="reviewSec">
      <Box className="reviewImg">

        <img src={photo} className="imgReview" alt="user review" />
      </Box>

      <Box className="reviewCon">
        <Typography className="reviewTitle">
          {t("HappyFamily")}
        </Typography>
        <Typography>
          <Rating className="stars" name="read-only" value={5} readOnly />
        </Typography>
        <Typography className="reviewDis">
          {t("HappyFamilyDes")}
        </Typography>
        <Typography color={"gray"} className="reviewCap" variant="caption">
          {t("HappyFamilyAuth")}
        </Typography>
      </Box>

    </Box >
  </>
}

export default UsersReview