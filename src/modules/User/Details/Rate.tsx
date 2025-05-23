import { Box, Button, FormHelperText, Rating, RatingProps, styled, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { roomReviewSchema } from '../../../validations/rate/rate';
import z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorOutline } from '@mui/icons-material';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { api } from '../../../utils/custom';
import LoginModal from '../../../components/SharedUser/LoginModal/LoginModal';




interface StyledRatingProps extends RatingProps {
    error?: boolean;
}

const StyledRating = styled(Rating)<StyledRatingProps>(({ theme, error }) => ({
    '& .MuiRating-icon': {
        color: error ? theme.palette.error.main : '',
    },
    '& .MuiRating-iconEmpty': {
        color: error ? theme.palette.error.light : theme.palette.action.disabled,
    },
}));


export default function Rate() {
    const [value, setRate] = useState<number | null>(0);
    const { id } = useParams();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    type RoomReview = z.infer<typeof roomReviewSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<RoomReview>({
        resolver: zodResolver(roomReviewSchema),
    });

    useEffect(() => {
        if (id) {
            setValue('roomId', id);
        }
    }, [id, setValue]);


    const onSubmit: SubmitHandler<RoomReview> = async (rate) => {
        const existUser = localStorage.getItem("authToken");
        if (!existUser) {
            return handleClickOpen();
        }
        try {
            const { data } = await api.post('/portal/room-reviews', rate);
            toast.success(data.message);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        }
    }
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <StyledRating
                value={value}
                onChange={(_e, value) => { setRate(value as number); setValue('rating', value as number) }}
                sx={{ mt: 2 }}
                error={errors.rating ? Boolean(errors.rating.message) : undefined}
            />
            {errors.rating && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 0.5,
                    color: 'error.main',
                }}>
                    <ErrorOutline sx={{ fontSize: 16, mr: 0.5 }} />
                    <FormHelperText error>
                        {errors.rating.message}
                    </FormHelperText>
                </Box>
            )}
            <Box sx={{ mt: 1.5 }}>
                <Typography variant="h6" mb={1}>Message</Typography>
                <input type="hidden" {...register('roomId')} />
                <TextField
                    placeholder="Write your review"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.review}
                    sx={{ "& fieldset": { borderColor: "#203FC7", borderRadius: 4 } }}
                    {...register('review')}
                    helperText={errors.review?.message}
                />
                <Button variant="contained" type="submit" sx={{ mt: 4, paddingX: "4rem" }}>Rate</Button>
            </Box>
            <LoginModal open={open} handleClose={handleClose} />

        </Box>
    )
}
