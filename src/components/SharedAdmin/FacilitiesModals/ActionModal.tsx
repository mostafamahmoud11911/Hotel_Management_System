import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import { Close } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import facilitySchema from '../../../validations/facility/facility';
import { RoomFacilities } from '../../../types/types';

function ActionModal({ isOpen, handleClose, facilityId, getAllFacilities, isEdit }: { isOpen: boolean, handleClose: () => void, facilityId: string, getAllFacilities: () => void, isEdit: boolean }) {

    const [spinner, setSpinner] = useState<boolean>(false);

    const { handleSubmit, register, formState: { errors }, setValue } = useForm<RoomFacilities>({ resolver: zodResolver(facilitySchema) })


    const getFacilityDetails = useCallback(async () => {
        try {
            const { data } = await api.get(`/admin/room-facilities/${facilityId}`);
            setValue('name', data.data.facility.name)
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message ||
                'An unexpected error occurred');
        }
    }, [facilityId])

    
    useEffect(() => {
        if (isEdit && facilityId) {
            getFacilityDetails();
        } else {
            setValue('name', '')
        }
    }, [isEdit, facilityId, getFacilityDetails]);




    const onSubmit: SubmitHandler<RoomFacilities> = async (facilityData) => {
        setSpinner(true)
        try {
            const { data } = await api({
                method: isEdit ? 'put' : 'post',
                url: isEdit ? `/admin/room-facilities/${facilityId}` : `/admin/room-facilities`,
                data: facilityData
            })
            toast.success(data.message);

            getAllFacilities()
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        } finally {
            setSpinner(false)
            handleClose()
            if (!isEdit) {
                setValue('name', '')
            }
        }
    };



    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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

                        <Typography variant="h6" sx={{
                            position: 'absolute',
                            left: 20,
                            top: 20,
                        }}>{isEdit ? "Edit Facility" : "Add Facility"}</Typography>

                        <Box sx={{ mt: 4 }}>
                            <TextField label="Name" error={!!errors.name} variant="outlined" helperText={errors.name?.message} {...register("name")} fullWidth />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' type='submit' disabled={spinner}>{spinner ? isEdit ? "Editing..." : "Add..." : isEdit ? "Edit facility" : "Add facility"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    )
}


export default React.memo(ActionModal);