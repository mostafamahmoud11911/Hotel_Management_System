import { AxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import baseUrl, { api } from "../../../utils/custom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Rooms } from "../../../types/types";
import { Box, Breadcrumbs, Button, Container, Skeleton, Typography } from "@mui/material";
import formatCurrency from "../../../utils/formatCurrency";
import Calendar from "../../../components/SharedUser/Calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro";
import Capacity from "../../../components/Capacity/Capacity";
import facility1 from "../../../assets/Images/ic_ac 1.png"
import facility2 from "../../../assets/Images/ic_bathroom.png"
import facility3 from "../../../assets/Images/ic_bedroom.png"
import facility4 from "../../../assets/Images/ic_diningroom 1.png"
import facility5 from "../../../assets/Images/ic_kulkas.png"
import facility6 from "../../../assets/Images/ic_livingroom.png"
import facility7 from "../../../assets/Images/ic_tv.png"
import facility8 from "../../../assets/Images/ic_wifi 1.png"
import Review from "./Review";
import LoginModal from "../../../components/SharedUser/LoginModal/LoginModal";
import { Paths } from "../../../constant/enums";
import { LazyLoadImage } from "react-lazy-load-image-component";





export default function Details() {
    const [room, setRoom] = useState<Rooms | null>(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
console.log(loading);
    const facilities = useMemo(() => [
        {
            img: facility1,
            count: 7,
            name: "unit ready"
        },
        {
            img: facility2,
            count: 3,
            name: "bathroom"
        },
        {
            img: facility3,
            count: 5,
            name: "bedroom"
        },
        {
            img: facility4,
            count: 1,
            name: "dining room"
        },
        {
            img: facility5,
            count: 2,
            name: "refigrator"
        },
        {
            img: facility6,
            count: 1,
            name: "living room"
        },
        {
            img: facility7,
            count: 4,
            name: "television"
        },
        {
            img: facility8,
            count: 10,
            name: "mbp/s"
        },
    ], []);

    const day = dayjs();
    const nextDay = dayjs().add(1, 'day');

    const [selectDate, setSelectDate] = useState<DateRange<Dayjs>>([
        day,
        nextDay,
    ]);

    const [capacity, setCapacity] = useState(1);

    const startDate = dayjs(selectDate[0]).format('YYYY-MM-DD');
    const endDate = dayjs(selectDate[1]).format('YYYY-MM-DD');


    const getRoom = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await baseUrl.get(`/portal/rooms/${id}`);
            console.log(data.data);
            setRoom(data.data.room);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }, [id]);

    const calculateTotalPrice = () => {
        if (!room) return 0;

        const pricePerNight = room.price;
        const numberOfNights = dayjs(selectDate[1]).diff(dayjs(selectDate[0]), 'day');
        const discountMultiplier = 1 - (room.discount / 100);

        return pricePerNight * capacity * numberOfNights * discountMultiplier;
    };


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleBooking = async () => {
        if (localStorage.getItem("authToken") === null) {
            return handleClickOpen()
        }
        try {
            const bookingData = {
                room: room?._id,
                startDate,
                endDate,
                totalPrice: calculateTotalPrice()
            };
            const { data } = await api.post('/portal/booking', bookingData);
            navigate(`/${Paths.PAYMENT}/${data.data.booking._id}`);
            toast.success(data.message);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        }
    }


    useEffect(() => {
        if (id) {
            getRoom()
        }
    }, [getRoom, id])

    return (
        <Container>
            <Box sx={{ margin: "0 20px" }}>
                <Typography variant="h5" mb={2} textAlign="center" fontWeight={600}>{room?.roomNumber}</Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" style={{ textDecoration: "none", color: "black", fontSize: "14px" }} to={Paths.LANDING}>
                        Home
                    </Link>
                    <Link
                        style={{ textDecoration: "none", color: "black", fontSize: "14px" }}
                        color="inherit"
                        to={`/${Paths.DETAILS}/${id}`}
                    >
                        Rooms Details
                    </Link>
                </Breadcrumbs>







                <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { md: "repeat(3,  1fr)" }, gridTemplateRows: { md: "repeat(2,  1fr)" }, columnGap: { md: 1 }, rowGap: { xs: 1 }, position: "relative" }}>



                    {room?.images.map((image, index) => (
                        <Box key={index} sx={{ gridColumn: index === 0 ? "span 2" : "span 1", gridRow: index === 0 ? "span 2" : "span 1", overflow: "hidden", position: "relative" }}>
                            <LazyLoadImage src={image} alt="room" effect="blur" width="100%" height="100%" loading="lazy" placeholder={<Skeleton variant="rectangular" width="100%" height="100%" />} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                        </Box>
                    ))}


                </Box>



                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", mt: 4 }}>
                    <Box sx={{ flex: { md: 1, xs: "1 0 100%" }, maxWidth: { md: "50%", xs: "100%" } }}>
                        <Typography variant="body1" color="textDisabled">
                            Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
                        </Typography>
                        <Typography variant="body1" my={2} color="textDisabled">
                            Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.
                        </Typography>
                        <Typography variant="body1" color="textDisabled">
                            Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The national agency for design: enabling Singapore to use design for economic growth and to make lives better.
                        </Typography>


                        <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(4,  1fr)", xs: "repeat(3,  1fr)" }, gap: 2, mt: 2 }}>
                            {facilities.map((facility, index) => (
                                <Box key={index}>
                                    <img src={facility.img} alt="icon" />
                                    <Typography variant="body1">{facility.count} {facility.name}</Typography>
                                </Box>
                            ))}
                        </Box>

                    </Box>
                    <Box sx={{ flex: { md: 1, xs: "1 0 100%" }, maxWidth: { md: "50%", xs: "100%" }, border: "1px solid #E5E5E5", borderRadius: "8px", p: 2 }}>
                        <Typography variant="body1">Start Booking</Typography>
                        <Typography variant="h4" my={2}><span style={{ color: "#1ABC9C" }}>{formatCurrency(room?.price as number ?? 0)}</span><span style={{ fontWeight: "200", color: "#B0B0B0", marginLeft: "10px" }}>Per night</span></Typography>
                        <Typography variant="body1" color="error" my={2}>Discount: <span>{room?.discount ?? 0}</span> % Off</Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
                            <Capacity capacity={capacity} setCapacity={setCapacity} />

                            <Typography variant="caption">You will pay <span>{formatCurrency(calculateTotalPrice()) ?? 0}</span></Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Button variant="contained" onClick={handleBooking} sx={{ width: "max-content", padding: "7px 70px" }}>Book Now</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>



                <Review />


                <LoginModal open={open} handleClose={handleClose} />
            </Box>
        </Container>
    )
}
