import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import { Close } from '@mui/icons-material';
import { Box, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdsRoom, Rooms } from '../../../types/types';
import AdsSchema from '../../../validations/ads/ads';

export default function ActionModal({ isOpen, handleClose, adId, getAllAds, isEdit }: { isOpen: boolean, handleClose: () => void, adId: string, getAllAds: () => void, isEdit: boolean }) {

  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [roomId, setRoomId] = useState("");
  const [isActive, setIsActive] = useState("");
  const [discount, setDiscount] = useState(0);
  const [spinner, setSpinner] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<AdsRoom>({ resolver: zodResolver(AdsSchema) })


  const getRooms = async () => {
    try {
      const { data } = await api.get("/admin/rooms?page=1&size=100");
      setRooms(data.data.rooms);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    }
  }



  const getAdDetails = useCallback(async () => {
    try {
      const { data } = await api.get(`/admin/ads/${adId}`);
      setRoomId(data.data.ads.room._id);
      setValue("room", data.data.ads.room._id);
      setValue("isActive", String(data.data.ads.isActive));
      setIsActive(String(data.data.ads.isActive));
      setDiscount(data.data.ads.room.discount);
      setValue("discount", data.data.ads.room.discount);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    }
  }, [adId])














  useEffect(() => {
    if (isOpen) {
      getRooms();

      if (isEdit) {
        getAdDetails();
      } else {
        setValue('room', '')
        setValue('isActive', '')
        setValue('discount', 0)
      }
    }
  }, [isOpen, isEdit]);








  const onSubmit: SubmitHandler<AdsRoom> = async (adData) => {
    const adEdit = {
      isActive: adData.isActive,
      discount: adData.discount
    }
    setSpinner(true)
    try {
      const { data } = await api({ url: isEdit ? `/admin/ads/${adId}` : "/admin/ads", method: isEdit ? "put" : "post", data: isEdit ? adEdit : adData });
      toast.success(data.message);
      getAllAds()
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    } finally {
      setSpinner(false)
      handleClose()
      if (!isEdit) {
        setValue('room', '')
        setValue('isActive', '')
        setValue('discount', 0)
      }
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{
            width: "100%",
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
            }}>{isEdit ? "Edit Ad" : "Add Ad"}</Typography>

            <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
              {isEdit ? <TextField
                select
                label="Select Room"
                fullWidth
                disabled={isEdit}
                value={roomId}
                {...register("room", {
                  required: true,
                })}
                error={!!errors.room}
                helperText={
                  errors?.room?.message?.toString()
                }
              >
                {rooms.map((room) => (
                  <MenuItem value={room._id}>{room.roomNumber}</MenuItem>
                ))}
              </TextField> :
                <TextField
                  select
                  label="Select Room"
                  fullWidth
                  {...register("room", {
                    required: true,
                  })}
                  error={!!errors.room}
                  helperText={
                    errors?.room?.message?.toString()
                  }
                >
                  {rooms.map((room) => (
                    <MenuItem value={room._id}>{room.roomNumber}</MenuItem>
                  ))}
                </TextField>}


              <TextField
                id="outlined-required"
                fullWidth
                defaultValue={isEdit ? discount : 0}
                {...register("discount", {
                  required: "Discount is required", valueAsNumber: true,
                  validate: (value) =>
                    (value !== undefined && +value >= 0) ||
                    "Please enter a positive number",
                })}
              />




              <TextField
                label="Status"
                select
                defaultValue={isActive}

                {...register("isActive", {
                  required: true,
                })}
                error={!!errors.isActive}
                helperText={
                  errors?.isActive?.message?.toString()
                }
                fullWidth
              >
                <MenuItem value={"true"}>Active</MenuItem>
                <MenuItem value={"false"}>Not Active</MenuItem>
              </TextField>



            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' aria-label='Add' type='submit' disabled={spinner}>{spinner ? isEdit ? "Editing..." : "Add..." : isEdit ? "Edit Ad" : "Add Ad"}</Button>

          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
