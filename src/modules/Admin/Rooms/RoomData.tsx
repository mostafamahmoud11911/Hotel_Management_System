import { AxiosError } from 'axios';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import { FileUpload } from '@mui/icons-material';
import { Box, Button, Checkbox, CircularProgress, Container, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Facilities } from '../../../types/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roomSchema } from '../../../validations/room/room';
import { z } from 'zod';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function RoomData() {
  const location = useLocation();
  const isEdit = location.state?.isEdit === "edit";
  const { id } = useParams()
  const [facilities, setFacilities] = useState<Facilities[]>([]);
  const [facilityIds, setFacilityIds] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingFacilities, setLoadingFacilities] = useState(false);

  const navigate = useNavigate();



  type RoomForm = z.infer<typeof roomSchema>;

  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm<RoomForm>({ resolver: zodResolver(roomSchema) });



  const getFacilities = async () => {
    setLoadingFacilities(true)
    try {
      const { data } = await api.get(`/admin/room-facilities?page=1&size=100`);
      setFacilities(data.data.facilities);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred');
    } finally {
      setLoadingFacilities(false)
    }
  }

  useEffect(() => {
    getFacilities();
    if (isEdit && location.state?.data?.facilities) {
      setFacilityIds(location.state?.data?.facilities.map((facility: { _id: string; }) => facility._id));
      setValue("facilities", location.state?.data?.facilities.map((facility: { _id: string; }) => facility._id));
      setValue("imgs", location.state?.data?.images.map((img: string) => img));
    }
  }, [])







  const getFormData = (room: RoomForm) => {
    const formData = new FormData();
    formData.append("roomNumber", room.roomNumber);
    formData.append("price", room["price"].toString());
    formData.append("capacity", room.capacity.toString());
    formData.append("discount", room.discount.toString());
    room.facilities.forEach((facility) => formData.append("facilities[]", facility));
    const selectedImgs = Array.from(watch("imgs")) as File[];
    selectedImgs.forEach((img) => formData.append("imgs", img))

    return formData;
  }



  const onSubmit: SubmitHandler<RoomForm> = async (room) => {
    setLoading(true);
    const roomData = getFormData(room)
    try {
      const { data } = await api({
        method: isEdit ? "put" : "post",
        url: isEdit ? `/admin/rooms/${id}` : "/admin/rooms",
        data: roomData
      });
      toast.success(data.message);
      navigate("/dashboard/rooms")
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    } finally {
      setLoading(false);
    }


  }


  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("roomNumber")}
          label="Room Number"
          defaultValue={isEdit ? location.state?.data?.roomNumber : null}
          error={!!errors.roomNumber}
          helperText={errors.roomNumber?.message}
          fullWidth sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              {...register("price", {
                required: "Discount is required", valueAsNumber: true,
                validate: (value) =>
                  (value !== undefined && +value >= 0) ||
                  "Please enter a positive number",
              })}
              defaultValue={isEdit ? location.state?.data?.price : null}
              label="Price"
              error={!!errors.price}
              helperText={errors.price?.message}
              fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField
              {...register("capacity", {
                required: "Discount is required", valueAsNumber: true,
                validate: (value) =>
                  (value !== undefined && +value >= 0) ||
                  "Please enter a positive number",
              })}
              label="Capacity"
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
              defaultValue={isEdit ? location.state?.data?.capacity : null}

              fullWidth />
          </Grid>
          <Grid size={6}>
            <TextField
              {...register("discount", {
                required: "Discount is required", valueAsNumber: true,
                validate: (value) =>
                  (value !== undefined && +value >= 0) ||
                  "Please enter a positive number",
              })}
              label="Discount"
              error={!!errors.discount}
              helperText={errors.discount?.message}
              defaultValue={isEdit ? location.state?.data?.discount : null}
              fullWidth />
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth error={!!errors.facilities}>
              <InputLabel id="demo-multiple-checkbox-label">Facilities</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                label="Facilities"
                multiple
                {...register('facilities')}
                onChange={(e: SelectChangeEvent<string[]>) => {
                  const value = e.target.value;
                  const selectedIds = typeof value === 'string' ? [value] : value;
                  if (isEdit) {
                    setFacilityIds(selectedIds);
                  } else {
                    setSelectedFacilities(selectedIds);
                  }
                  setValue('facilities', selectedIds);
                }}
                value={isEdit ? facilityIds : selectedFacilities}
                renderValue={(selected) => {
                  const selectedName = selected.map((id) => facilities.find((facility) => facility._id === id)?.name) || '';
                  return selectedName.join(' - ');
                }}
                MenuProps={MenuProps}
              >
                {loadingFacilities ? <MenuItem disabled>
                  <CircularProgress size={24} />
                  <ListItemText primary="Loading facilities..." sx={{ ml: 2 }} /></MenuItem> : facilities.map((facility) => (
                    <MenuItem key={facility._id} value={facility._id}>
                      <Checkbox checked={isEdit ? facilityIds.includes(facility._id) : selectedFacilities.includes(facility._id)} />
                      <ListItemText primary={facility.name} />
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{errors.facilities?.message}</FormHelperText>
            </FormControl>

          </Grid>
        </Grid>
        <input type="file" accept="image/*"  {...register("imgs")} multiple style={{ display: "none" }} id="image" />
        <label htmlFor="image">
          <Box sx={{ mt: 2, cursor: "pointer", border: "2px dashed green", p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              <FileUpload />
              <Typography variant='body2'>Drag & Drop or Choose a Room Images to Upload</Typography>

            </Box>
          </Box>

        </label>
        <Button type='submit' fullWidth disabled={loading} variant='contained' sx={{ mt: 2 }}>{loading ? <CircularProgress size={24} /> : "Submit"}</Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

      </Box>

    </Container>
  )
}
