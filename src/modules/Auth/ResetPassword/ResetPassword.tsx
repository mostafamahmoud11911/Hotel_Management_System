import { Refresh, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import resetSchema from '../../../validations/auth/Reset';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPass } from '../../../types/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import baseUrl from '../../../utils/custom';
import { Link, useNavigate } from 'react-router';

export default function ResetPassword() {
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirnPassword, setShowConfirnPassword] = useState(false);
  const navigate = useNavigate()



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirnPassword((show) => !show);



  const { register, formState: { errors }, handleSubmit } = useForm<ResetPass>({ resolver: zodResolver(resetSchema) })

  const onSubmit: SubmitHandler<ResetPass> = async (pass) => {
    setPending(true)
    try {
      const { data } = await baseUrl.post("/admin/users/reset-password", pass);
      console.log(data);
      toast.success("Success Reset");
      navigate("/login")
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
    } finally {
      setPending(false)
    }
  }


  return (
    <Box>
      <Typography variant='h5'>Reset Password</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant='body2'>If you already have an account register</Typography>
        <Typography variant='body2' sx={{ mt: .5 }}>You can  <Link to="/login" style={{ color: "red", textDecoration: "none" }}>Login here !</Link></Typography>
      </Box>




      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={4} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <TextField
            fullWidth
            label="Email Address"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            placeholder='Please type here'
          />
        </Box>




        <Box>
          <TextField
            fullWidth
            {...register("seed")}
            label="OTP"
            error={Boolean(errors.seed)}
            helperText={errors.seed?.message}
            placeholder='Please type here'
          />
        </Box>


        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              {...register("password")}
              label="Password"
              error={Boolean(errors.password)}
              placeholder='Please type here'
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
            <FormHelperText>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              type={showConfirnPassword ? 'text' : 'password'}
              {...register("confirmPassword")}
              error={Boolean(errors.confirmPassword)}
              placeholder='Please type here'
              label="Confirm Password"
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
            <FormHelperText>
              {errors.confirmPassword?.message}
            </FormHelperText>
          </FormControl>
        </Box>


        <Button variant="contained" type='submit' sx={{ p: 2 }} disabled={pending}>{pending ? <Refresh /> : "Reset"}</Button>
      </Box>
    </Box>
  )
}
