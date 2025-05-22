import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Button, DialogActions, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import deleteImg from "../../../assets/Images/deleted.png";
import { api } from '../../../utils/custom';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

function DeleteModal({ isOpen, handleClose, facilityId, getAllFacilities }: { isOpen: boolean, handleClose: () => void, facilityId: string, getAllFacilities: () => void }) {
    const [spinner, setSpinner] = useState<boolean>(false)


    const handleDelete = async () => {
        setSpinner(true)
        try {
            await api.delete(`/admin/room-facilities/${facilityId}`)
            toast.success("Room deleted successfully")
            handleClose()
            getAllFacilities()
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        } finally {
            setSpinner(false)
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
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
                        onClick={handleClose}
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
                            Delete This Facility ?
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