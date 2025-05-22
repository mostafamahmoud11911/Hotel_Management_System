import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import deleteImg from "../../../assets/Images/deleted.png";
import { Close } from '@mui/icons-material';


 function DeleteModal({ isOpen, handleModalClose, bookingId, getAllBookings }: { isOpen: boolean, handleModalClose: () => void, bookingId: string, getAllBookings: () => void }) {

    const [spinner, setSpinner] = useState<boolean>(false);
    const handleDelete = async () => {
        setSpinner(true)
        try {
            const { data } = await api.delete(`/admin/booking/${bookingId}`);
            getAllBookings();
            handleModalClose();
            toast.success(data.message);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        } finally {
            setSpinner(false)
        }
    }

console.log("object");

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleModalClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent sx={{
                    width: "100%",
                    position: 'relative',
                    textAlign: 'center',
                    pt: 6,
                }}>
                    <IconButton
                        onClick={handleModalClose}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                            color: 'text.secondary',
                            '&:hover': {
                                color: 'text.primary',
                                backgroundColor: 'action.hover',
                            },
                            transition: 'color 0.2s ease, background-color 0.2s ease',
                        }}
                        aria-label="close"
                    >
                        <Close sx={{ fontSize: 24 }} />
                    </IconButton>
                    <img src={deleteImg} alt="delete" />

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="body1" fontWeight="bold">
                            Delete This Book ?
                        </Typography>
                        <Typography variant='caption'>
                            are you sure you want to delete this item ? if you are sure just click on delete it
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleDelete} disabled={spinner}>{spinner ? "Deleting..." : "Delete"}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}


export default React.memo(DeleteModal);