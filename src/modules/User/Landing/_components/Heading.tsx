import { Box, Button, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import Calendar from "../../../../components/SharedUser/Calendar/Calendar";
import Capacity from "../../../../components/Capacity/Capacity";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper';
import "swiper/swiper-bundle.css"
import landing1 from "../../../../assets/Images/LandingImg.jpg"
import landing2 from "../../../../assets/Images/HotelRoom1.jpg"
import landing3 from "../../../../assets/Images/HotelRoom2.jpg"
import landing4 from "../../../../assets/Images/HotelRoom3.jpg"
import { Paths } from "../../../../constant/enums";
import { LazyLoadImage } from "react-lazy-load-image-component";






function Heading() {
    const navigate = useNavigate()
    const day = dayjs();
    const nextDay = dayjs().add(1, 'day');

    const [selectDate, setSelectDate] = useState<DateRange<Dayjs>>([
        day,
        nextDay,
    ]);

    const [capacity, setCapacity] = useState(1);

    const startDate = dayjs(selectDate[0]).format('YYYY-MM-DD');
    const endDate = dayjs(selectDate[1]).format('YYYY-MM-DD');



    const goToExplore = (startDate: string, endDate: string, capacity: number) => {
        navigate(`/${Paths.EXPLORE}`, { state: { startDate, endDate, capacity } });
    }




    const images = useMemo(() => [
        landing1,
        landing2,
        landing3,
        landing4
    ], [])



    return (
        <Box>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "center",
                    maxWidth: "600px",
                    mx: { md: "auto", xs: 0 }
                }}>
                    <Typography component="h1" variant="h4" fontWeight="bold">Forget Busy Work, Start Next Vacation</Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        We provide what you need to enjoy your holiday with family. Time to make another memorable moments.
                    </Typography>

                    <Box mt={3}>
                        <Typography variant="body1" color="#152C5B">Start Booking</Typography>
                        <Typography variant="subtitle2" component="span" color="#152C5B">Pick a Date</Typography>
                        <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
                    </Box>

                    <Box mt={3}>
                        <Typography variant="subtitle2" component="span" color="#152C5B">Capacity</Typography>
                        <Capacity capacity={capacity} setCapacity={setCapacity} />
                    </Box>

                    <Button
                        variant="contained"
                        aria-label="explore"
                        sx={{
                            '&:focus-visible': {
                                outline: '3px solid #005fcc',
                                outlineOffset: '2px',
                            },
                            '&:focus:not(:focus-visible)': {
                                outline: 'none'
                            },
                            width: "fit-content",
                            px: 9,
                            py: 1,
                            mt: 3
                        }}
                        onClick={() => goToExplore(startDate, endDate, capacity)}
                    >
                        Explore
                    </Button>
                </Box>


                <Box sx={{
                    flex: 1,
                    display: { xs: "none", md: "flex" },
                    justifyContent: "end",
                    alignItems: "center",
                    p: 2,
                    position: "relative",

                }}>
                    <Box sx={{
                        width: "350px",
                        height: "300px",
                        borderRadius: "5rem 10px 10px 10px",
                        overflow: "hidden",
                        position: "relative",
                    }}>
                        <Swiper
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                            autoplay={{
                                delay: 1200,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            spaceBetween={0}
                            effect={"fade"}
                            fadeEffect={{
                                crossFade: true
                            }}
                            loop={true}
                            modules={[Autoplay, EffectFade]}
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#f5f5f5"
                                }}>
                                    <LazyLoadImage
                                        style={{
                                            objectFit: "cover",
                                            display: "block"
                                        }}
                                        width={"100%"}
                                        height={"100%"}
                                        effect="blur"
                                        loading="eager"
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>

                </Box>

            </Box>



        </Box>
    )
}


export default React.memo(Heading)