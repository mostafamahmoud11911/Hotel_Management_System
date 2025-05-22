import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { z } from 'zod';
import { loginSchema } from '../../../validations/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import baseUrl from '../../../utils/custom';
import { Pages, Paths, Role } from '../../../constant/enums';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    type Login = z.infer<typeof loginSchema>

    const { handleSubmit, register, formState: { errors } } = useForm<Login>({ resolver: zodResolver(loginSchema) })

    const { id } = useParams();
    const pathname = location.pathname.split("/")[1];

    const onSubmit: SubmitHandler<Login> = async (user) => {
        setLoading(true)
        try {
            const { data } = await baseUrl.post('/admin/users/login', user);
            localStorage.setItem("authToken", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));
            toast.success(data.message);
            handleClose();
            if (data.data.user.role === Role.ADMIN) {
                return navigate(`/${Pages.DASHBOARD}`)
            }
            if (data.data.user.role === Role.USER) {
                if (pathname === Paths.DETAILS) {
                    return navigate(`/${Paths.DETAILS}/${id}`)
                } else {
                    return navigate(`/${Paths.FAVORITE}`);
                }
            }
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
        >
            <Box sx={{ p: 1 }}>
                <DialogTitle>
                    Login
                </DialogTitle>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ display: "flex", flexDirection: "column", rowGap: 3 }}>
                        <TextField label="E-mail" {...register('email')} error={!!errors.email} helperText={errors.email?.message} variant="outlined" />
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
                                            onClick={() => setShowPassword(!showPassword)}
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
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" aria-label='login' variant='contained' fullWidth sx={{ mx: 2 }}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Dialog>
    )
}
