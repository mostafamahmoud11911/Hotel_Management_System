import {
  HotelRoom1,
  HotelRoom2,
  HotelRoom3,
  HotelRoom4,
  HotelRoom5,
} from "@/Assets/Images";
import {
  Calendar,
  ImageCard,
  ImageCard2,
  LoginDialog,
  UsersReview,
} from "@/Components";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { AllAdsData } from "@/Redux/Features/Portal/Ads/getAllAdsSlice";
import { AddFavoriteItem } from "@/Redux/Features/Portal/Favorites/AddToFavoriteSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { getRooms } from "@/Redux/Features/Portal/Rooms/GetAllRoomsSlice";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, IconButton, Skeleton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs, Range } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Landing.module.scss";
import { useTranslation } from "react-i18next";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion"
const Landing = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const [disabled, setDisabled] = useState(false);
  const [bookingGuestCount, setBookingGuestCount] = useState(1);
  const navigate = useNavigate();
  const today = dayjs();
  const [isLoading, setLoading] = useState(false);
  const nextDate = dayjs().add(1, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    today,
    nextDate,
  ]);

  useEffect(() => {
    getRoomsData(15);
    getAdsData();
    dispatch(fetchDataIslogged());
    if (localStorage.getItem("userRole") === "user") getFavoriteData();
  }, [dispatch, count, data]);

  const handleIncrease = () => {
    setBookingGuestCount(bookingGuestCount + 1);
  };

  const handleDecrease = () => {
    if (bookingGuestCount > 1) {
      setBookingGuestCount(bookingGuestCount - 1);
    }
  };

  const startDate = dayjs(selectedDateRange[0]).format("YYYY-MM-DD");
  const endDate = dayjs(selectedDateRange[1]).format("YYYY-MM-DD");

  const [adsData, setAdsData] = useState();
  //! ************************ Rooms Ads *************************
  const getAdsData = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(AllAdsData());
      // @ts-ignore

      setAdsData(element?.payload?.data?.data?.ads);
    } finally {
      setLoading(false);
    }
  };

  //! ************************ Add To Favorite  *************************
  const addItemToFavorite = async (roomId: any) => {
    // setLoading(!isLoading);

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
      // setLoading(!isLoading);
    }
  };

  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([]);
  const getFavoriteData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore

      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } catch (error) { }
  };

  //! ************************ Get Rooms  *************************
  const [rooms, setRooms] = useState([]);

  const getRoomsData = async (roomCount: any) => {
    setLoading(true);

    try {
      const element = await dispatch(
        // @ts-ignore
        getRooms({ startDate, endDate, roomCount })
      );
      // @ts-ignore
      setRooms(element?.payload?.data?.rooms);
    } finally {
      setLoading(false);
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const MotionButton = motion(Button)
  return (
    <>
      <LoginDialog {...{ handleClose, open }} />
      <Box component="section" className="landingSec">
        <Box className="leftCon">
          <Box className="content">
            <Typography variant="h1" className="title">
              {t("homeTitle")}
            </Typography>
            <Typography className="subTitle">{t("homeDes")}</Typography>

            <Box className="bookingCon">
              <Typography variant="h3" className="bookingTitle">
                {t("startBooking")}
              </Typography>
              <Typography variant="h4" className="subBookingTitle">
                {t("pickADate")}
              </Typography>
            </Box>

            <Box className="exploreCon">
              <Calendar {...{ selectedDateRange, setSelectedDateRange }} />

              <Box className="capacityCon">
                <IconButton
                  onClick={handleIncrease}
                  className="caleBtn"
                  color="primary"
                  sx={{
                    fontSize: { xs: "1px", sm: "1px", md: "1px" },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    borderRadius: "12px",
                    p: "8px",
                    mr: { xs: "5px", sm: "10px" },
                    ml: "5px",
                  }}
                >
                  <Add />
                </IconButton>
                <TextField
                  className="capacityField"
                  label="Capacity"
                  value={`${bookingGuestCount} person`}
                />
                <IconButton
                  onClick={handleDecrease}
                  className="caleBtnDiscernment"
                  color="error"
                  sx={{
                    fontSize: { xs: "1px", sm: "1px", md: "1px" },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    borderRadius: "12px",
                    p: "8px",
                    mr: { xs: "5px", sm: "10px" },
                    ml: "5px",
                  }}
                >
                  <Remove />
                </IconButton>
              </Box>
            </Box>

            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              className="submitExplore"
              onClick={() =>
                navigate(`/explore`, {
                  state: {
                    range: selectedDateRange,
                    persons: bookingGuestCount,
                  },
                })
              }
              variant="contained"
              color="primary"
            >
              {t("explore")}
            </MotionButton>
          </Box>
        </Box>

        <Box className="rightCon">
          <Swiper
            autoplay={{
              delay: 1200,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            effect={"fade"}
            loop={true}
            modules={[Autoplay, EffectFade]}
            className="LandingImg "
          >

            <SwiperSlide>
              <Box className="">
                <img className="background" src={HotelRoom1} />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="">
                <img className="background" src={HotelRoom2} />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="">
                <img className="background" src={HotelRoom3} />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="">
                <img className="background" src={HotelRoom4} />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className="">
                <img className="background" src={HotelRoom5} />
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Box>

      <Box className="userContainer">
        <Box component="section" className="viewSec">
          <Typography variant="h4" className="adsTitle">
            {t("mostPopularAds")}
          </Typography>

          <Box className="grid">

            {adsData?.map((ele, index) => (
              <Box key={ele?._id} className={`${index === 0 ? "main" : ""}`}>
                <ImageCard
                  {...{
                    disabled,
                    selectedDateRange,
                    ele,
                    deleteFavoriteItem,
                    addItemToFavorite,
                    startDate,
                    endDate,
                    bookingGuestCount,
                    favList,
                  }}
                />
              </Box>
            ))}
          </Box>

          <Typography variant="h4" className="bookingTitle">
            {t("mostBookedRooms")}
          </Typography>
          <Box
            className="sliderCon">
            <Swiper
              slidesPerView={6}
              spaceBetween={20}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              // loop={true}
              modules={[Autoplay]}
              breakpoints={{
                200: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1075: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
                1220: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper"
            >
                {rooms?.slice()?.reverse()?.map((ele) =>
                  <SwiperSlide>
                    <ImageCard2
                      key={ele?._id}
                      {...{
                        selectedDateRange,
                        ele,
                        deleteFavoriteItem,
                        addItemToFavorite,
                        startDate,
                        endDate,
                        bookingGuestCount,
                        favList,
                        disabled,
                      }}
                    />
                  </SwiperSlide>
                )
              }
            </Swiper>
          </Box>
        </Box>
        <Box component="section" className="reviewUsersSection">
          <UsersReview />
        </Box>
      </Box>
    </>
  );
};

export default Landing;
