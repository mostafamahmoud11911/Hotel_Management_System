/** @format */

import { getRooms } from "@/Redux/Features/Portal/Rooms/GetAllRoomsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageCard2, LoginDialog } from "@/Components";
import {
  Box,
  Breadcrumbs,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { AddFavoriteItem } from "@/Redux/Features/Portal/Favorites/AddToFavoriteSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import {
  Link,
  useLocation
} from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Explore.module.scss";
import { Home, Living } from "@mui/icons-material";
import dayjs, { Range, Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
const Explore = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const dispatch = useDispatch();
  const today = dayjs();
  const nextDate = dayjs().add(1, "day");
  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = rooms?.slice(indexOfFirstItem, indexOfLastItem);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const { state } = useLocation();

  const startDate = state?.range
    ? dayjs(state?.range[0]).format("YYYY-MM-DD")
    : today;
  const endDate = state?.range
    ? dayjs(state?.range[1]).format("YYYY-MM-DD")
    : nextDate;

  const handlePageChange = async (event, page) => {
    try {
      setIsLoading(true);
      setCurrentPage(page);
      await getRoomsData(52);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getRoomsData(52);
    getFavoriteData();
    if (state?.range[0] == undefined) setSelectedDateRange(undefined);
  }, [dispatch, count, data]);

  const bookingGuestCount = state?.persons;
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    state?.range[0],
    state?.range[1],
  ]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //! ************************ Get Rooms  *************************
  const getRoomsData = async (roomCount: any) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const element = await dispatch(
        // @ts-ignore
        getRooms({ startDate, endDate, roomCount })
      );
      // @ts-ignore
      setRooms(element?.payload?.data?.rooms);
    } finally {
      setIsLoading(false);
    }
  };

  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([]);
  const getFavoriteData = async () => {
    setIsLoading(true);

    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } finally {
      setIsLoading(false);
    }
  };

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

  //! ************************ Add To Favorite  *************************
  const addItemToFavorite = async (roomId: any) => {
    try {
      setDisabled(true);
      if (!localStorage.getItem("authToken")) {
        return handleClickOpen();
      } else if (localStorage.getItem("userRole") !== "user") {
        toast.error("please ensure you are logged in to your user account", {
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        // @ts-ignore
        const element = await dispatch(AddFavoriteItem(roomId));
        // @ts-ignore
        toast.success(element?.payload?.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } finally {
      setDisabled(false);
    }
  };
  const loadingArray = Array.from(
    new Array(currentRooms?.length || itemsPerPage)
  );
  return (
    <>
      <LoginDialog {...{ handleClose, open }} />
      <Box component={"main"} className={style.exploreContainer}>
        <Box className="userContainer">
          <Typography variant="h1" className="title">
            {t("ExploreALLRooms")}
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link className="path" color="inherit" to={"/"}>
              {" "}
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              {t("home")}
            </Link>
            <Typography variant="caption" className="subPath">
              <Living fontSize="inherit" sx={{ mr: 0.5 }} />
              {t("explore")}
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
              {t("AllRooms")}
            </Typography>
          </Box>
          <Box className={style.ExploreImages} justifyContent={"center"}>
            {isLoading
              ? loadingArray.map((index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  animation="wave"
                  style={{ minWidth: 200, height: 200, flex: 1 }}
                />
              ))
              : currentRooms?.slice()?.reverse()?.map((ele, index) => (
                <Box
                  key={index}
                  sx={{ minWidth: 200, height: 200, my: 2, flex: 1 }}
                  className={` ${isSmallScreen ? style.imgExplore : ""}`}
                  height={"100vh"}
                >
                  <ImageCard2
                    className={style.cardImage}
                    key={ele?._id}
                    {...{
                      ele,
                      index,
                      bookingGuestCount,
                      favList,
                      deleteFavoriteItem,
                      addItemToFavorite,
                      disabled,
                      selectedDateRange,
                    }}
                  />
                </Box>
              ))}
          </Box>
          <Stack spacing={2} marginTop={4} justifyContent={"center"}>
            <Pagination
              page={currentPage}
              variant="outlined"
              color="primary"
              count={Math?.ceil(rooms?.length / itemsPerPage)}
              className={style.pagination}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </Box >
    </>
  );
};

export default Explore;
