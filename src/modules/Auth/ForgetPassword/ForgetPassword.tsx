import { Box, Button, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router'
import forgetSchema from '../../../validations/auth/Forget';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ForgetData } from '../../../types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import baseUrl from '../../../utils/custom';
import { Refresh } from '@mui/icons-material';

export default function ForgetPassword() {
  const [pending, setPending] = useState(false);
    const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetData>({
    resolver: zodResolver(forgetSchema),
  });

  const onSubmit: SubmitHandler<ForgetData> = async (email: ForgetData) => {
    setPending(true)
    try {
      const { data } = await baseUrl.post("/admin/users/forgot-password", email);
      toast.success(data.message);
      navigate("/resetpass")
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
    } finally {
      setPending(false)
    }
  }

  return (
    <Box>
      <Typography variant='h5'>Forgot password</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant='body2'>If you don’t have an account register</Typography>
        <Typography variant='body2' sx={{ mt: .5 }}>You can  <Link to="/login" style={{ color: "red", textDecoration: "none" }}>Login here !</Link></Typography>
      </Box>



      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={4} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <TextField
          label="Email Address"
            error={!!errors.email}
            {...register("email")}
            helperText={errors.email?.message}
            fullWidth
            placeholder='Please type here'
          />
        </Box>


        <Button variant="contained" type='submit' sx={{ p: 2 }} disabled={pending}>{pending ? <Refresh /> : "Send Email"}</Button>
      </Box>
    </Box>
  )
}
