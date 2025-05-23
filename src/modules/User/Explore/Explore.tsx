import { Box, Breadcrumbs, Container, IconButton, Pagination, Stack, styled, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { NavLink } from "react-router";
import { toast } from "sonner";
import baseUrl, { api } from "../../../utils/custom";
import { useCallback, useEffect, useState } from "react";
import { Rooms } from "../../../types/types";
import formatCurrency from "../../../utils/formatCurrency";
import { Visibility } from "@mui/icons-material";
import BouncingLoader from "../../../components/SharedAdmin/Loader/Loader";
import { Paths } from "../../../constant/enums";
import Fav from "../../../components/SharedUser/Fav/Fav";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoginModal from "../../../components/SharedUser/LoginModal/LoginModal";

const Link = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
    textAlign: "end",
    fontSize: 14,
    '&.active,&:hover': {
        color: theme.palette.primary.main
    }
}))

export default function Explore() {
    const [rooms, setRooms] = useState<Rooms[]>([]);
    const [favorites, setFavorites] = useState<Rooms[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const itemsPerPage: number = 10;


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const getAllRooms = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await baseUrl.get('/portal/rooms/available');
            setTotalPages(data.data.totalCount);
            setRooms(data.data.rooms);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }, [setRooms, setTotalPages])

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayItems = rooms.slice(startIndex, endIndex);

    const pageCount = Math.ceil(totalPages / itemsPerPage);







    const getAllFavorites = useCallback(async () => {
        try {
            const { data } = await api.get('/portal/favorite-rooms');
            setFavorites(data.data.favoriteRooms[0].rooms);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        }
    }, [setFavorites])




    const handleFavDelete = async (id: string) => {
        const existUser = localStorage.getItem("authToken");
        if (!existUser) {
            return handleClickOpen();
        }
        try {
            const { data } = await api.delete(`/portal/favorite-rooms/${id}`, { data: { roomId: id } });
            toast.success(data.message);
            getAllFavorites();
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        }
    }

    useEffect(() => {
        getAllRooms();
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            getAllFavorites();
        }

    }, [getAllFavorites, getAllRooms])
    return (
        <Container>
            <Box sx={{ margin: "0 20px" }}>
                <Typography variant="h5" mb={2} textAlign="center" fontWeight={600}>Explore ALL Rooms</Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to={Paths.LANDING}>
                        Home
                    </Link>
                    <Link
                        color="inherit"
                        to={`/${Paths.EXPLORE}`}
                    >
                        Explore
                    </Link>
                </Breadcrumbs>

                <Box mt={5}>
                    <Typography variant="body1" color="#152C5B" fontWeight={"bold"} mb={2}>All Rooms</Typography>
                    {!loading && rooms.length === 0 && <Typography variant="body1" color="#152C5B" textAlign={"center"} fontWeight={"bold"} mb={2}>No rooms available</Typography>}
                    {loading ? <BouncingLoader /> : <>

                        <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(4,  1fr)", sm: "repeat(3,  1fr)", xs: "repeat(2,  1fr)" }, gap: 2 }}>
                            {displayItems.map(room => (
                                <Box key={room._id} sx={{ position: "relative", overflow: "hidden", borderRadius: "8px", "&:hover > div": { display: "flex" } }}>
                                    <LazyLoadImage src={room.images[0]} width={"100%"} height={"100%"} style={{ objectFit: "cover", borderRadius: "8px" }} alt={"img" + room._id} />
                                    <Box sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "#FF498B", color: "white", padding: "4px 8px", borderRadius: "0 0 0 8px" }}>{formatCurrency(room.price)}</Box>
                                    <Box sx={{ backgroundColor: "#203FC736", width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 1, display: "none", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                                        <Fav favorites={favorites} fav={room} handleFavDelete={handleFavDelete} getAllFavorites={getAllFavorites} />

                                        <Link to={`/${Paths.DETAILS}/${room._id}`}>
                                            <IconButton sx={{ color: "white" }}>
                                                <Visibility sx={{ cursor: "pointer" }} />
                                            </IconButton>
                                        </Link>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Stack direction={"row"} justifyContent={"center"} my={7}>
                            <Pagination count={pageCount} onChange={(_event, page) => { setCurrentPage(page) }} variant="outlined" page={currentPage} />
                        </Stack>
                    </>}

                </Box>

            </Box>

            <LoginModal open={open} handleClose={handleClose} />

        </Container>
    )
}
