import { Box, IconButton, Skeleton, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '../../../../utils/custom';
import { Ads, Rooms } from '../../../../types/types';
import { useCallback, useEffect, useState } from 'react';
import { Visibility } from '@mui/icons-material';
import formatCurrency from '../../../../utils/formatCurrency';
import { Link } from 'react-router';
import { Paths } from '../../../../constant/enums';
import Fav from '../../../../components/SharedUser/Fav/Fav';
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoginModal from '../../../../components/SharedUser/LoginModal/LoginModal';




export default function AdsPopular() {
  const [ads, setAds] = useState<Ads[]>([]);
  const [favorites, setFavorites] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getAllAds = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get("/portal/ads");
      setAds(data.data.ads)
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [setAds]);


  const getAllFavorites = async () => {
    try {
      const { data } = await api.get('/portal/favorite-rooms');
      console.log(data);
      setFavorites(data.data.favoriteRooms[0].rooms);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
    }
  }




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
    getAllAds();
    if (localStorage.getItem("authToken") !== null) {
      getAllFavorites()
    }
  }, [getAllAds]);
  return (
    <>
      {!loading && ads.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h6">No ads found</Typography>
        </Box>
      )}
      {loading ? <SkeletonLoader /> :

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "repeat(4,  1fr)" },
            gridTemplateRows: { md: "repeat(2,  1fr)" },
            gap: 2,
          }}
        >
          {

            ads.slice(0, 4).map((ad, index) => (
              <Box key={index} sx={{ gridColumn: index === 0 ? "span 2" : "", gridRow: index === 0 ? "span 2" : "", overflow: "hidden", position: "relative", borderRadius: "8px", "&:hover > div": { display: "flex" }, aspectRatio: index === 0 ? "span 2" : "" }}>
                <Box sx={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                  <LazyLoadImage
                    src={ad.room.images[0] + '?w=800&q=80'}
                    effect="blur"
                    placeholderSrc={
                      ad.room.images[0]
                        ? `${ad.room.images[0]}?w=50&q=30`
                        : '/placeholder-image.webp'
                    }
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "cover",
                      transition: 'opacity 0.3s ease',
                      backgroundColor: '#f5f5f5'
                    }}
                    alt={`${ad.room.roomNumber} room photo`}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/fallback-image.webp';
                      e.currentTarget.style.objectFit = 'contain';
                    }}
                    visibleByDefault={false}
                  />
                  <Box sx={{ position: "absolute", bottom: 0, left: 0, padding: "5px 10px" }}>
                    <Typography variant='body2' sx={{ color: "white" }}>{ad.room.roomNumber}</Typography>
                  </Box>
                </Box>
                <Box sx={{ backgroundColor: "#203FC736", width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 1, display: "none", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                  <Fav favorites={favorites} fav={ad.room} handleFavDelete={handleFavDelete} getAllFavorites={getAllFavorites} />

                  <Link to={`/${Paths.DETAILS}/${ad.room._id}`}>
                    <IconButton sx={{ color: "white" }}>
                      <Visibility sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </Link>
                </Box>
                <Box sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "#FF498B", borderRadius: "0px 8px 0px 8px", padding: "5px 30px", color: "white", fontWeight: "bold", fontSize: "12px" }}>
                  {formatCurrency(ad.room.price)}
                </Box>
              </Box>

            ))

          }
        </Box>
      }
      <LoginModal open={open} handleClose={handleClose} />


    </>
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


