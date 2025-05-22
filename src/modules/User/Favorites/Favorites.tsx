import { Box, Breadcrumbs, Container, IconButton, Skeleton, styled, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { Paths } from "../../../constant/enums";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { api } from "../../../utils/custom";
import { Rooms } from "../../../types/types";
import { Visibility } from "@mui/icons-material";
import Fav from "../../../components/SharedUser/Fav/Fav";
import { LazyLoadImage } from "react-lazy-load-image-component";


const Link = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  textAlign: "end",
  fontSize: 14,
  '&.active,&:hover': {
    color: theme.palette.primary.main
  }
}))


export default function Favorites() {
  const [favorites, setFavorites] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState(false);


  const getAllFavorites = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/portal/favorite-rooms');
      setFavorites(data.data.favoriteRooms[0].rooms);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }




  const handleFavDelete = async (id: string) => {
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
    getAllFavorites()
  }, [])
  return (
    <Container>
      <Box sx={{ margin: "0 20px" }}>
        <Typography variant="h5" mb={2} textAlign="center" fontWeight={600}>Your Favorites</Typography>

        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to={Paths.LANDING}>
            Home
          </Link>
          <Link

            color="inherit"
            to={`/${Paths.FAVORITE}`}
          >
            Favorite
          </Link>
        </Breadcrumbs>


        {!loading && favorites.length === 0 && (
          <Typography variant="body1" color="#152C5B" textAlign={"center"} fontWeight={"bold"} mb={2}>No rooms available</Typography>
        )}

        {loading ? (
          <SkeletonLoader />
        ) : <Box sx={{ mt: 5 }}>
          <Typography variant="h6" mb={2} fontWeight={500}>Your Rooms</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(4, 1fr)", sm: "repeat(2, 1fr)", xs: "repeat(1, 1fr)" }, gap: 2 }}>
            {favorites.map((fav) => (
              <Box key={fav._id} sx={{ position: "relative", borderRadius: "5px", overflow: "hidden", '&:hover > .overlay': { display: 'flex' } }}>
                <LazyLoadImage src={fav.images[0]} width={"100%"} height={"100%"} effect="blur" loading="lazy" alt={fav.roomNumber + fav._id} style={{ objectFit: "cover" }} />
                <Box className="overlay" sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#203FC736", display: "none", justifyContent: "center", alignItems: "center" }}>
                  <Fav favorites={favorites} fav={fav} handleFavDelete={handleFavDelete} getAllFavorites={getAllFavorites} />
                  <Link to={`/${Paths.DETAILS}/${fav._id}`}>
                    <IconButton sx={{ color: "white" }}>
                      <Visibility sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </Link>
                </Box>
                <Box sx={{ position: "absolute", left: 15, bottom: 10, color: "white" }}>

                  <Typography variant="h6" sx={{ color: "white", fontWeight: 500 }}>{fav.roomNumber}</Typography>

                </Box>
              </Box>
            ))}
          </Box>
        </Box>}



      </Box>
    </Container>
  )
}




const SkeletonLoader = () => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(4,  1fr)" }, gap: 2 }}>
      <Skeleton height={300} />
      <Skeleton height={300} />
      <Skeleton height={300} />
      <Skeleton height={300} />
    </Box>
  );
};