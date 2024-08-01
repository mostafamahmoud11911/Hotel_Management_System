/** @format */

import { chartsData } from "@/Redux/Features/Admin/Charts/ChartsSlice";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { ArrowUpward, Discount, Grade } from "@mui/icons-material";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./Home.module.scss";
import { Helmet } from "react-helmet";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getCartsData();
    dispatch(fetchDataIslogged());
  }, [dispatch]);

  const [bookingStatus, setBookingStatus] = useState({
    booking: {},
    user: {},
    ads: 0,
    facilities: 0,
    rooms: 0,
  });

  //! ***************Get Facilities Data ***************
  const getCartsData = async () => {
    try {
      setLoading(true)
      // @ts-ignore
      const element = await dispatch(chartsData());
      // @ts-ignore
      const dataKind = element?.payload?.data;

      setBookingStatus({
        booking: dataKind?.bookings,
        user: dataKind?.users,
        ads: dataKind?.ads,
        facilities: dataKind?.facilities,
        rooms: dataKind?.rooms,
      });
      setLoading(false)
    } catch (error) {
      toast.error(error);
      setLoading(false)
    }
  }

  const data = [
    { id: 0, value: bookingStatus?.booking?.completed, label: "Completed" },
    { id: 1, value: bookingStatus?.booking?.pending, label: "Pending" },
    {
      id: 2,
      value:
        bookingStatus?.booking?.completed + bookingStatus?.booking?.pending,
      label: "BookingRooms",
    },
  ];

  const data2 = [
    {
      id: 0,
      value: bookingStatus?.user?.admin,
      label: "Admin",
      color: "rgb(0, 196, 159)",
    },
    {
      id: 1,
      value: bookingStatus?.user?.user,
      label: "User",
      color: "rgb(255, 128, 66)",
    },
  ];

  const data3 = [
    { id: 0, value: bookingStatus?.rooms, label: "All Rooms", color: "orange" },
    {
      id: 1,
      value: bookingStatus?.ads,
      label: "discounts",
      color: "rgb(184, 0, 216)",
    },
    {
      id: 2,
      value: bookingStatus?.facilities,
      label: "facilities",
      color: "rgb(46, 150, 255)",
    },
  ];
  const isSmallOrMediumScreen = useMediaQuery("(max-width: 960px)");
  const isLargScreen = useMediaQuery("(max-width: 1030px)");
  return (
    <>
      <Helmet>
        <title> Home • Staycation</title>
      </Helmet>

      {loading ? <Box className="loaderContainer">
        <Box className="loader" ></Box>
      </Box>
        :
        <Box component={"main"}>
          <Typography className="homeTitle">DashBoard Analysis</Typography>

          <Box
            className="homeGrid"
            sx={{
              display: isSmallOrMediumScreen ? "flex" : "grid",
              gridTemplateColumns: {
                xl: "repeat(auto-fit, minmax(300px, 1fr))",
                lg: "repeat(auto-fit, minmax(1fr, 1fr))",
              },
              gap: "20px",
              flexDirection: isSmallOrMediumScreen ? "column" : "row",
            }}
          >
            <Box className="cardBox">
              <Box className="">
                <Card className="card2">
                  <CardContent className="cardCon2">
                    <Box className="iconCon2">
                      <Discount />
                    </Box>
                    <Box className="cardNumberCon2">
                      <Typography className="cardNumber">
                        {bookingStatus?.rooms}
                      </Typography>
                      <Box className="cardIcon2">
                        <ArrowUpward className="arrow2" />
                      </Box>
                    </Box>
                    <Typography className="cardTitle2">Total Offers</Typography>
                  </CardContent>
                  {isSmallOrMediumScreen && (
                    <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                      <PieChart
                        margin={{ top: 20, bottom: 20, left: 0, right: 150 }}
                        series={[
                          {
                            data,
                            highlightScope: {
                              faded: "global",
                              highlighted: "item",
                            },
                            faded: {
                              innerRadius: 30,
                              additionalRadius: -30,
                              color: "gray",
                            },
                          },
                        ]}
                        slotProps={{ legend: { padding: 0 } }}
                        height={150}
                      />
                    </Box>
                  )}
                </Card>
              </Box>
              {!isSmallOrMediumScreen && (
                <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                  <PieChart
                    margin={{ top: 20, bottom: 20, left: 0, right: 150 }}
                    series={[
                      {
                        data,
                        highlightScope: { faded: "global", highlighted: "item" },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    slotProps={{ legend: { padding: 0 } }}
                    height={isLargScreen ? 150 : 200}
                  />
                </Box>
              )}
            </Box>
            {/*2*/}

            <Box className="cardBox">
              <Card className="card">
                <CardContent className="cardCon">
                  <Box className="iconCon">
                    <RoomPreferencesIcon />
                  </Box>
                  <Box className="cardNumberCon">
                    <Typography className="cardNumber">
                      {bookingStatus?.ads}
                    </Typography>
                    <Box className="cardIcon">
                      <ArrowUpward className="arrow" />
                    </Box>
                  </Box>
                  <Typography className="cardTitle">Total Rooms</Typography>
                </CardContent>
                {isSmallOrMediumScreen && (
                  <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                    <PieChart
                      margin={{ top: 20, bottom: 20, left: 30, right: 150 }}
                      series={[
                        {
                          data: data2,
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                        },
                      ]}
                      height={150}
                      slotProps={{
                        legend: {
                          direction: "column",
                          position: { vertical: "middle", horizontal: "right" },
                          padding: 0,
                        },
                      }}
                    />
                  </Box>
                )}
              </Card>
              {!isSmallOrMediumScreen && (
                <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                  <PieChart
                    margin={{ top: 20, bottom: 20, left: 0, right: 150 }}
                    series={[
                      {
                        data: data2,
                        highlightScope: { faded: "global", highlighted: "item" },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    height={isLargScreen ? 150 : 200}
                  />
                </Box>
              )}
              {/*3*/}
            </Box>
            <Box className="cardBox">
              <Card className="card3">
                <CardContent className="cardCon3">
                  <Box className="iconCon3">
                    <Grade />
                  </Box>
                  <Box className="cardNumberCon3">
                    <Typography className="cardNumber">
                      {bookingStatus?.facilities}
                    </Typography>
                    <Box className="cardIcon3">
                      <ArrowUpward className="arrow3" />
                    </Box>
                  </Box>
                  <Typography className="cardTitle3">
                    Rooms with facilities
                  </Typography>
                </CardContent>
                {isSmallOrMediumScreen && (
                  <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                    <PieChart
                      margin={{ top: 20, bottom: 20, left: 0, right: 150 }}
                      series={[
                        {
                          data: data3,
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                        },
                      ]}
                      height={isLargScreen ? 150 : 200}
                    />
                  </Box>
                )}
              </Card>
              {!isSmallOrMediumScreen && (
                <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                  <PieChart
                    margin={{ top: 20, bottom: 20, left: 0, right: 150 }}
                    series={[
                      {
                        data: data3,
                        highlightScope: { faded: "global", highlighted: "item" },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    height={isLargScreen ? 150 : 200}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      }
    </>
  );
};

export default Home;
