import {
  RoomDetails1,
  RoomDetails2,
  RoomDetails3,
  ac,
  bathroom,
  bedroom,
  diningroom,
  kulkas,
  livingroom,
  tv,
  wifi,
} from "@/Assets/Images";
import { Calendar, LoginDialog } from "@/Components";
import { CreateBooking } from "@/Redux/Features/Portal/Booking/CreateBookingSlice";
import { roomDetails } from "@/Redux/Features/Portal/Rooms/GetRoomDetailsSlice";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs, { Dayjs, Range } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./RoomDetails.module.scss";
import { LoadingButton } from "@mui/lab";
import { Add, Details, Home, Remove } from "@mui/icons-material";
import FeedbackComponent from "@/Components/UserSharedComponents/FeedbackComponent/FeedbackComponent";
import RatingComponent from "@/Components/UserSharedComponents/Rating/RatingComponent";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";


import { motion } from "framer-motion"
const RoomDetails = () => {
  const { t } = useTranslation();

  const [showMore, setShowMore] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  const { state } = useLocation();
  const { range } = state;

  const dispatch = useDispatch();
  const today = dayjs();
  const nextDate = dayjs()?.add(1, "day");
  const startDate = range ? dayjs(range[0])?.format("YYYY-MM-DD") : today;
  const endDate = range ? dayjs(range[1])?.format("YYYY-MM-DD") : nextDate;

  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    startDate,
    endDate,
  ]);


  const bookingGuestCount = state?.persons;
  const id = state?.roomId;

  const [details, setDetails] = useState();

  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //! ************************ Get Room Details *************************
  const getRoomDetails = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(roomDetails(id));
      // @ts-ignore
      setDetails(element?.payload?.data?.data?.room);
      // @ts-ignore
      setPrice(element?.payload?.data?.data?.room?.price);
    } finally {
    }
  };

  //! ************************ Booking Room  *************************
  const [loading, setLoading] = useState(false);
  const handleBooking = async (e: any) => {
    e.preventDefault();
    if (!localStorage.getItem("authToken")) {
      return handleClickOpen();
    } else if (localStorage.getItem("userRole") !== "user") {
      toast.error("please ensure you are logged in to your user account", {
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      try {
        setLoading(true);
        const element = await dispatch(
          // @ts-ignore
          CreateBooking({ startDate, endDate, id, price })
        );

        // @ts-ignore
        toast.success(element?.payload?.message, {
          autoClose: 2000,
          theme: "colored",
        });
        // @ts-ignore
        navigate(`/stripePayment/${element?.payload?.data?.booking?._id}`);
      } finally {
        setLoading(false);
      }
    }
  };

  //! ************************ facilities Content *************************
  const facilitiesDetails = [
    { Icon: bedroom, main: 5, sub: `${t("bedroom")}` },
    { Icon: livingroom, main: 1, sub: `${t("livingRoom")}` },
    { Icon: bathroom, main: 3, sub: `${t("bathroom")}` },
    { Icon: diningroom, main: 1, sub: `${t("diningRoom")}` },
    { Icon: wifi, main: 10, sub: `${t("mbp/s")}` },
    { Icon: ac, main: 7, sub: `${t("unitReady")}` },
    { Icon: kulkas, main: 2, sub: `${t("refigrator")}` },
    { Icon: tv, main: 4, sub: `${t("television")}` },
  ];

  const descriptions = [
    "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    "Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.",
    "Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The national agency for design: enabling Singapore to use design for economic growth and to make lives better.",
  ];
  const displayedDescriptions = showMore
    ? descriptions
    : descriptions.slice(0, 1);

  const [personsCount, setPersonsCount] = useState(1);

  const handleIncrease = () => {
    setPersonsCount(personsCount + 1);
  };

  const handleDecrease = () => {
    if (personsCount > 1) {
      setPersonsCount(personsCount - 1);
    }
  };

  useEffect(() => {
    getRoomDetails();
    if (bookingGuestCount !== undefined) setPersonsCount(bookingGuestCount);
  }, []);
  const MotionButton = motion(Button)
  return (
    <>
      <Helmet>
        <title> Room Details • Staycation</title>
      </Helmet>
      <LoginDialog {...{ handleClose, open }} />
      <Box component={"main"} className="roomDetailsCon">
        <Box className="userContainer">
          <Typography variant="h1" className="title">
            {details?.roomNumber}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link className="path" color="inherit" to={"/"}>
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              {t("home")}
            </Link>
            <Typography variant="caption" className="subPath">
              <Details fontSize="inherit" sx={{ mr: 0.5 }} />
              {t("RoomDetails")}
            </Typography>
          </Breadcrumbs>
          <Box component={"section"} className="roomImages">
            <Box className="gridDetails">
              <>
                <img
                  className="image"
                  src={details?.images[0] ? details?.images[0] : RoomDetails1}
                  alt="roomImage"
                />
                <img
                  className="img"
                  src={details?.images[1] ? details?.images[1] : RoomDetails2}
                  alt="roomImage"
                />
                <img
                  className="img"
                  src={details?.images[2] ? details?.images[2] : RoomDetails3}
                  alt="roomImage"
                />
              </>
            </Box>

            <Box
              component={"section"}
              className={`roomDetailsBooking ${isSmallScreen && style.roomBookMobView
                }`}
            >
              <Box className="roomDetailsDec">
                {displayedDescriptions?.map((description, index) => (
                  <Typography
                    key={index}
                    className={`description ${showMore ? "show-all" : ""}`}
                  >
                    {description}
                  </Typography>
                ))}
                {showMore ? "" : "..."}
                <Button color="primary" onClick={handleShowMore}>
                  {showMore ? "Show Less" : "Show More"}
                </Button>

                <Box className="roomFacilities">
                  {facilitiesDetails.map(({ main, Icon, sub },index) => (
                    <Box key={index} className="facilities">
                      <img className="facilitiesIcon" src={Icon} width={36} height={36} alt="Icons" />
                      <Typography className="mainDec">
                        {main}
                        <Typography variant="caption" className="subDec">
                          {sub}
                        </Typography>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box component={"form"} className="roomDetailsBook">
                <Card
                  variant="outlined"
                  className="roomDetailsCard"
                  sx={{
                    paddingBlock: "2em",
                    paddingLeft: { xs: ".5em", md: "1.5em" },
                  }}
                >
                  <CardContent className="cardContent">
                    <Typography className="bookingCon">
                      {t("StartBooking")}
                    </Typography>
                    <Typography className="bookingPrice">
                      {`$${price} `}
                      <Typography variant="caption" className="priceFor">
                        {t("perNight")}
                      </Typography>
                    </Typography>
                    {Math.round((details?.discount / price) * 100) !== 0 && (
                      <Typography className="bookingDiscount">
                        {t("Discount")}
                        {Math.round((details?.discount / price) * 100)} %
                      </Typography>
                    )}
                    <Typography className="bookingTitle">
                      {t("pickADate")}
                    </Typography>
                    <Box className={style.calenderBox}>
                      <Calendar
                        {...{ setSelectedDateRange, selectedDateRange }}
                      />
                    </Box>

                    <Box
                      className="capacityCon"
                      sx={{
                        display: "flex",
                        margin: "1rem 0rem",
                        padding: { sm: "" },
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
                        value={`${personsCount} person`}
                        style={{
                          padding: "0px",
                        }}
                        sx={{
                          marginBottom: { xs: "0rem", md: 0 },
                          width: { xs: "12rem", sm: "15rem" },
                        }}
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

                    <Typography className="grayColor">
                      {t("YouWillPay")}

                      <Typography variant="caption" className="bookingCon">
                        {`$${personsCount ? price * personsCount : price} USD`}
                      </Typography>
                      <Typography variant="caption" className="sub">
                        {t("pre")}
                      </Typography>
                      <Typography variant="caption" className="bookingCon">
                        {`${personsCount !== 1 && personsCount !== undefined
                          ? `${personsCount} ${t("persons")}`
                          : `1 ${t("person")}`
                          } `}
                      </Typography>
                    </Typography>
                    <Box className="submitBooking">
                      {loading ? (
                        <LoadingButton
                          className="submitBtn white"
                          loading
                          variant="outlined"
                        >
                          {t("ContinueBook")}
                        </LoadingButton>
                      ) : (
                        <MotionButton
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.8 }}
                          className="submitBtn"
                          type="submit"
                          variant="contained"
                          onClick={handleBooking}
                        >
                          {t("ContinueBook")}
                        </MotionButton>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            {localStorage.getItem("authToken") &&
              localStorage.getItem("userRole") === "user" ? (
              <>
                <Box component={"section"} className={style.review}>
                  <Box className={style.roomfeedback}>
                    <Typography
                      color="#152C5B"
                      fontSize={"clamp(1rem, 2.5vw, 2rem)"}
                    >
                      {t("Rating")}
                    </Typography>
                    <RatingComponent id={id} />
                  </Box>
                  <Box className={style.reviewLine}></Box>
                  <Box className={style.comments}>
                    <Typography
                      color="#152C5B"
                      fontSize={"clamp(1rem, 2.5vw, 2rem)"}
                    >
                      {t("Comment")}
                    </Typography>
                    <FeedbackComponent id={id} />
                  </Box>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RoomDetails;
