import 'swiper';
import "swiper/swiper-bundle.css"
import review1 from "../../../../assets/Images/review1.jpg";
import review2 from "../../../../assets/Images/review2.jpg";
import review3 from "../../../../assets/Images/review3.png";
import { ArrowForward, ArrowBack, Star } from '@mui/icons-material';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";


function Reviews() {
    const reviews = useMemo(() => [
        {
            id: crypto.randomUUID(),
            desc: "Happy Family",
            rates: 5,
            desc2: "What a great trip with my family and I should try again next time soon ...",
            createdBy: "Angga, Product Designer",
            image: review1
        },
        {
            id: crypto.randomUUID(),
            desc: "Happy Family",
            rates: 2,
            desc2: "What a great trip with my family and I should try again next time soon ...",
            createdBy: "Angga, Product Designer",
            image: review2
        },
        {
            id: crypto.randomUUID(),
            desc: "Happy Family",
            rates: 4,
            desc2: "What a great trip with my family and I should try again next time soon ...",
            createdBy: "Angga, Product Designer",
            image: review3
        },
    ], []);

    return (


        <Box sx={{
            p: { md: "3rem", xs: "1rem" },
            height: "400px",
            position: "relative"
        }}>
            <Swiper loop resistanceRatio={0.85} speed={600} style={{ width: "100%", height: "100%" }}>
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{ display: "flex", gap: "20px", width: "100%", height: "100%" }}>
                            <Box sx={{ display: { md: "block", xs: "none", width: "30%", height: "100%" }, position: "relative" }}>
                                <LazyLoadImage src={review.image} loading='eager' effect="blur" width="100%" height="100%" alt="" style={{ objectFit: "cover", borderRadius: "15px 15px 3rem 15px" }} />
                            </Box>

                            <Box sx={{
                                position: "absolute",
                                left: { md: "350px" },
                                paddingLeft: "10px",
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Typography variant="h5" mb={3}>{review.desc}</Typography>
                                <Stack direction="row" gap={1}>
                                    {[1, 2, 3, 4, 5].map((_, index) => {
                                        const stars = Array(review.rates).fill(0).map((_, index) => index).length;



                                        return (
                                            <Star key={index} sx={{ color: index < stars ? "gold" : "gray" }} />
                                        )
                                    })}
                                </Stack>
                                <Typography variant="h5" mt={1}>{review.desc2}</Typography>
                                <Typography variant="caption" mt={2} color='textDisabled'>{review.createdBy}</Typography>

                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
                <Box sx={{
                    position: "absolute",
                    left: { md: "350px" },
                    bottom: "30px",
                    display: "flex",
                    gap: "50px",
                    paddingLeft: "10px",
                    zIndex: 10
                }}>
                    <NavigationButtons />
                </Box>
            </Swiper>
        </Box>



    )
}
export default React.memo(Reviews);

const NavigationButtons = React.memo(() => {
    const swiper = useSwiper();

    return (
        <>
            <IconButton
                aria-label="Back"
                onClick={() => swiper.slidePrev()}
                sx={{ border: "4px solid blue", '&:hover': { backgroundColor: "blue" } }}
            >
                <ArrowBack color='primary' sx={{ '&:hover': { color: "white" } }} />
            </IconButton>
            <IconButton
                aria-label="Forward"
                onClick={() => swiper.slideNext()}
                sx={{ border: "4px solid blue", '&:hover': { backgroundColor: "blue" } }}
            >
                <ArrowForward color='primary' sx={{ '&:hover': { color: "white" } }} />
            </IconButton>
        </>
    );
})

