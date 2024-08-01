import { CommentUserRoom } from "@/Redux/Features/Portal/CommentUserRoom/CommentUserRoom ";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const FeedbackComponent = ({ id }) => {
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      roomId: id,
    },
  });
  const submitData = (data) => {
    setComment(data);
  };
  const setComment = async (data) => {
    setLoadingBtn(true);
    try {
      const roomCommentData = await dispatch(CommentUserRoom(data));
    } finally {
      setLoadingBtn(false);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(submitData)}>
      <Controller
        name="roomId"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <TextField
        placeholder="Type in here…"
        multiline
        rows={2}
        variant="outlined"
        fullWidth
        {...register("comment")}
      />

      <Box style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          style={{ textAlign: "end" }}
          color="primary"
          type="submit"
        >
          {loadingBtn ? <CircularProgress size={24} color="inherit" /> : "Send"}
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackComponent;
