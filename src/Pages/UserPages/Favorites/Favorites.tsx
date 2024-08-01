import { ImageCard2 } from "@/Components";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { Favorite, Home } from "@mui/icons-material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import {
  Box,
  Breadcrumbs,
  Button,
  Skeleton,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Favorites.module.scss";
import style from "./Favorites.module.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';

const Favorites = () => {
  const { t } = useTranslation();

  const [visibleImages, setVisibleImages] = useState(5);
  const [favList, setFavList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const dispatch = useDispatch();
  //! ************************ Get All Favorite Rooms  *************************
  const getFavoriteData = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFavoriteData();
  }, [dispatch, count, data]);

  //! ************************ Delete From Favorite  *************************

  const deleteFavoriteItem = async (roomId: any) => {
    try {
      setDisabled(true);
      // @ts-ignore
      const element = await dispatch(RemoveFavoriteItem(roomId));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setDisabled(false);
    }
  };

  const loadMoreImages = () => {
    setVisibleImages(favList?.length);
  };
  const loadLessImages = () => {
    setVisibleImages(
      Math.min(visibleImages - (favList?.length > 12 ? 6 : 3), favList?.length)
    );
  };
  const loadingArray = Array.from(new Array(5 || favList?.length));
  return (
    <>
      <Helmet>
        <title> Favorite Rooms • Staycation</title>
      </Helmet>
      <Box component={"main"} className="exploreCom">
        <Box className="userContainer">
          <Typography variant="h1" className="title">
            {t("FavoriteRooms")}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4.0 }}>
            <Link className="path" color="inherit" to={"/"}>
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              {t("home")}
            </Link>
            <Typography variant="caption" className="subPath">
              <Favorite fontSize="inherit" sx={{ mr: 0.5 }} />
              {t("Favorites")}
            </Typography>
          </Breadcrumbs>
          <Box marginBottom={3}>
            <Typography
              variant="h4"
              className="subTitle"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
              }}
            >
              {t("YourRooms")}
            </Typography>
          </Box>
          {isLoading ? (
            <Box className={style.favoriteComponent}>
              {loadingArray.map((index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={200}
                  height={200}
                  animation="wave"
                />
              ))}
            </Box>
          ) : (
            <>
              <Box className={style.favoriteComponent}>
                {favList.slice(0, visibleImages)?.map((ele, index) => (
                  <>
                    <Box
                      key={index}
                      sx={{ minWidth: 200, height: 200, my: 2, flex: 1 }}
                    // className={` ${isSmallScreen ? style.imgExplore : ""}`}

                    >
                      <ImageCard2
                        key={ele?._id}
                        {...{ ele, index, favList, deleteFavoriteItem, disabled }}
                      />
                    </Box>
                  </>
                ))}
              </Box>
              <Box textAlign={"center"} marginTop={4}>
                {visibleImages < favList.length && (
                  <Tooltip title="show more">
                    <Button onClick={loadMoreImages} className={style.showMore}>
                      <KeyboardDoubleArrowDownIcon />
                    </Button>
                  </Tooltip>
                )}
                {visibleImages == favList.length && (
                  <Tooltip title="show less">
                    <Button onClick={loadLessImages} className={style.showMore}>
                      <KeyboardDoubleArrowUpIcon />
                    </Button>
                  </Tooltip>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Favorites;
