import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import changeSchema from '../../../validations/auth/change'
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function ChangePassModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    type changePass = z.infer<typeof changeSchema>;

    const { handleSubmit, register, formState: { errors } } = useForm<changePass>({ resolver: zodResolver(changeSchema) })

    const onSubmit: SubmitHandler<changePass> = async (pass) => {
        setLoading(true)
        try {
            const { data } = await api.post('/admin/users/change-password', pass);
            toast.success(data.message);
            handleClose();
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-change"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                {"Change Password"}
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl fullWidth variant="outlined">
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            error={Boolean(errors.oldPassword)}
                            label="Old Password"
                            id="outlined-adornment-oldpassword"

                            placeholder='Please type here'
                            {...register("oldPassword")}
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
                        <FormHelperText error={Boolean(errors.oldPassword)}>
                            {errors.oldPassword?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                        <FormLabel>New Password</FormLabel>

                        <OutlinedInput
                            type={showNewPassword ? 'text' : 'password'}
                            error={Boolean(errors.newPassword)}
                            label="New Password"
                            id="outlined-adornment-newpassword"

                            placeholder='Please type here'
                            {...register("newPassword")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={Boolean(errors.newPassword)}>
                            {errors.newPassword?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                        <FormLabel>Confirm Password</FormLabel>

                        <OutlinedInput
                            type={showConfirmPassword ? 'text' : 'password'}
                            error={Boolean(errors.confirmPassword)}
                            label="Confirm Password"
                            id="outlined-adornment-conpassword"

                            placeholder='Please type here'
                            {...register("confirmPassword")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={Boolean(errors.confirmPassword)}>
                            {errors.confirmPassword?.message}
                        </FormHelperText>
                    </FormControl>
                    <Button type='submit' variant='contained' disabled={loading}>{loading ? "Submit..." : "Submit"}</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
