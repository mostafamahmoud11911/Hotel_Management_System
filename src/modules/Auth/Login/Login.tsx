import { Refresh, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from '../../../validations/auth/login';
import { LoginData } from '../../../types/types';
import { AxiosError } from "axios"
import baseUrl from '../../../utils/custom';
import { toast } from 'sonner';
import { Auth, Pages, Paths, Role } from '../../../constant/enums';


const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  textAlign: "end",
  fontSize: 14,
}));




export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit: SubmitHandler<LoginData> = async (user) => {
    setPending(true)
    try {
      const { data } = await baseUrl.post("/admin/users/login", user);
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success(data.message);
      if (data.data.user.role === Role.ADMIN) {
        navigate(`/${Pages.DASHBOARD}`)
      }

      if (data.data.user.role === Role.USER) {
        navigate(`${Paths.LANDING}`)
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    } finally {
      setPending(false)
    }

  }



  return (
    <Box>
      <Typography variant='h5'>Sign in</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant='body2'>If you don’t have an account register</Typography>
        <Typography variant='body2' sx={{ mt: .5 }}>You can  <Link to={`/${Auth.REGISTER}`} style={{ fontWeight: "bold", color: "inherit", textDecoration: "none" }}>Register here !</Link></Typography>
      </Box>



      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={4} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <TextField
            required
            fullWidth
            label="Email Address"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register("email")}
            placeholder='Please type here'
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>

          <FormControl fullWidth variant="outlined" error={Boolean(errors.password)}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              {...register("password")}
              label="Password"
              id="outlined-adornment-password"
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
            <FormHelperText error={!!errors.password}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <NavLink to={`${Paths.LANDING}`} style={{ fontWeight: "bold", color: "inherit", textDecoration: "none" }}>Landing</NavLink>
          <NavLink to={`/${Auth.FORGETPASS}`} >Forgot Password ?</NavLink>
        </Box>

        <Button type='submit' variant="contained" sx={{ p: 2 }} disabled={pending}>{pending ? <Refresh /> : "Login"}</Button>

      </Box>
    </Box>
  )
}
