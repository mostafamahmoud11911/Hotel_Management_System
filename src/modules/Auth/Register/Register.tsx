import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff, CloudUploadOutlined, Refresh } from '@mui/icons-material'
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { registerSchema } from '../../../validations/auth/Register';
import { RegisterData } from '../../../types/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import baseUrl from '../../../utils/custom';
import { Auth } from '../../../constant/enums';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirnPassword, setShowConfirnPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate()


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirnPassword((show) => !show);


  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });



  const getFormData = (user: RegisterData) => {

    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("confirmPassword", user.confirmPassword);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("country", user.country);
    formData.append("role", user.role as string);
    if (user.profileImage) {
      formData.append("profileImage", user.profileImage[0]);
    }
    return formData;
  };




  const onSubmit: SubmitHandler<RegisterData> = async (user) => {
    setPending(true)
    const userData = { ...user, role: "user" }
    const addFormData = getFormData(userData);
    try {
      const { data } = await baseUrl.post("/admin/users", addFormData);
      toast.success(data.message);
      navigate(`/${Auth.LOGIN}`)
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
    } finally {
      setPending(false)
    }
  }



  return (
    <Box>
      <Typography variant='h5'>Sign up</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant='body2'>If you already have an account register</Typography>
        <Typography variant='body2' sx={{ mt: .5 }}>You can  <Link to={`/${Auth.LOGIN}`} style={{ color: "red", textDecoration: "none" }}>Login here !</Link></Typography>
      </Box>




      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={4} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <TextField
            {...register("userName")}
            label="User Name"
            fullWidth
            error={Boolean(errors.userName)}
            helperText={errors.userName?.message}
            placeholder='Please type here'
          />
        </Box>


        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              {...register("phoneNumber")}
              label="Phone"
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
              fullWidth
              placeholder='Please type here'
            /></Grid>
          <Grid size={6}>
            <TextField
              {...register("country")}
              label="Country"
              error={Boolean(errors.country)}
              helperText={errors.country?.message}
              fullWidth
              placeholder='Please type here'
            /></Grid>
        </Grid>


        <Box>
          <TextField
            {...register("email")}
            fullWidth
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            placeholder='Please type here'
          />
        </Box>


        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors.password)}
              label="Password"
              id="outlined-adornment-password"
              placeholder='Please type here'
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={Boolean(errors.password)}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>

          <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-conpassword">Confirm Password</InputLabel>

            <OutlinedInput
              type={showConfirnPassword ? 'text' : 'password'}
              error={Boolean(errors.confirmPassword)}
              label="Confirm Password"
              id="outlined-adornment-conpassword"
              placeholder='Please type here'
              {...register("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirnPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={Boolean(errors.confirmPassword)}>
              {errors.confirmPassword?.message}
            </FormHelperText>
          </FormControl>
        </Box>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          startIcon={<CloudUploadOutlined />}
        >
          Profile Image
          <VisuallyHiddenInput
            type="file"
            {...register("profileImage")}
          />
        </Button>


        <Button variant="contained" type='submit' sx={{ p: 2 }} disabled={pending}>{pending ? <Refresh /> : "Sign up"}</Button>
      </Box>
    </Box>
  )
}
