import { Box, Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form';
import { roomCommentSchema } from '../../../validations/comment/comment';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '../../../utils/custom';
import LoginModal from '../../../components/SharedUser/LoginModal/LoginModal';


export default function Comment() {
    const { id } = useParams();
    type RoomComment = z.infer<typeof roomCommentSchema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<RoomComment>({
        resolver: zodResolver(roomCommentSchema),
    });

        const [open, setOpen] = useState(false);
    
        const handleClickOpen = () => {
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
        };



    useEffect(() => {
        if (id) {
            setValue('roomId', id);
        }
    });


    const onSubmit: SubmitHandler<RoomComment> = async (comment) => {
        const existUser = localStorage.getItem("authToken");
        if (!existUser) {
            return handleClickOpen();
        }
        try {
            const { data } = await api.post('/portal/room-comments', comment);
            toast.success(data.message);
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err?.response?.data?.message || err.message || 'An unexpected error occurred')
        }
    }
    return (
        <Box sx={{ mt: 5 }} component={"form"} onSubmit={handleSubmit(onSubmit)}>

            <TextField
                placeholder="Write your comment"
                label="Comment"
                multiline
                rows={4}
                fullWidth
                {...register('comment')}
                error={!!errors.comment}
                helperText={errors.comment?.message}
                sx={{ "& fieldset": { borderColor: "#203FC7", borderRadius: 4 } }}
            />
            <Button variant="contained" aria-label='submit' type="submit" sx={{ mt: 4, paddingX: "4rem" }}>send</Button>
            <LoginModal open={open} handleClose={handleClose} />

        </Box>
    )
}
