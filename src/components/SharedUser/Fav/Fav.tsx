import { Rooms } from '../../../types/types'
import { IconButton } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { api } from '../../../utils/custom';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';

function Fav({ favorites, fav, getAllFavorites, handleFavDelete }: { favorites: Rooms[], fav: Rooms, getAllFavorites: () => void, handleFavDelete: (id: string) => void }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose =  () => {
        setOpen(false);
    };


    const addFavorite = async (id: string) => {
        const existUser = localStorage.getItem("authToken");
        if (!existUser) {
            return handleClickOpen();
        }
        try {
            const { data } = await api.post('/portal/favorite-rooms', { roomId: id });
            toast.success(data.message);
            getAllFavorites();
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        }
    }


    return (
        <>
            {favorites.some((favo) => favo._id === fav._id) ? (
                <IconButton  color="error" onClick={() => handleFavDelete(fav._id)}>
                    <Favorite sx={{ cursor: "pointer" }} />
                </IconButton>
            ) :

                <IconButton sx={{ color: "white" }} onClick={() => addFavorite(fav._id)}>
                    <Favorite sx={{ cursor: "pointer" }} />
                </IconButton>
            }
            <LoginModal open={open} handleClose={handleClose} />
        </>
    )
}



export default React.memo(Fav)