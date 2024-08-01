import { setRatingRooms } from "@/Redux/Features/Portal/RatingSlice/RatingSlice";
import { Button, CircularProgress, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion"
export default function RatingComponent({ id }) {
  const [rateValue, setRateValue] = React.useState<number | null>(2);

  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const dispatch = useDispatch();
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      roomId: id,
    },
  });

  const submitData = (data) => {
    setRating(data);
  };
  const setRating = async (data) => {
    setLoadingBtn(true);
    try {
      const roomData = await dispatch(setRatingRooms(data));
    } finally {
      setLoadingBtn(false);
      setValue("review", "");
    }
  };
  const MotionButton = motion(Button)
  return (
    <Box component="form" onSubmit={handleSubmit(submitData)}>
      <Controller
        name="roomId"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Controller
        name="rating"
        control={control}
        defaultValue={rateValue}
        render={({ field: { onChange } }) => (
          <Rating name="rating" onChange={onChange} />
        )}
      ></Controller>

      <TextField
        placeholder="Type in here…"
        multiline
        rows={2}
        variant="outlined"
        fullWidth
        {...register("review")}
      />

      <Box style={{ marginTop: "1rem" }}>
        <MotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          color="primary"
          variant="contained"
          style={{ textAlign: "end" }}
          type="submit"
        >
          {loadingBtn ? <CircularProgress size={24} color="inherit" /> : "Rate"}
        </MotionButton>
      </Box>
    </Box>
  );
}
