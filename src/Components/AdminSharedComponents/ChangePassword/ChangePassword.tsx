import { fetchData } from "@/Redux/Features/Auth/ChangePasswordSlice";
import { LockOpen } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"
export default function ChangePassword() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const required = "This Field is required";

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(fetchData(data));
  };
  const { isConfirmPassword, loading } = useSelector(
    (state) => state.changePassword
  );
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    if (isConfirmPassword && !isPasswordChanged) {
      handleClose();
      setValue("oldPassword", null);
      setValue("newPassword", null);
      setValue("confirmPassword", null);
    }
  }, [isConfirmPassword, isPasswordChanged]);

  const MotionButton = motion(Button)
  return (
    <>
      <Box>
        <ListItemButton onClick={handleOpen}>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary={"ChangePassword"} />
        </ListItemButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="changePassword model"
          aria-describedby="that model you can change your password"
        >
          <Box className="changePasswordBox">
            <Typography variant="h6" component="h6">
              Change Password
            </Typography>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                type="password"
                className="auth-input"
                label="Old Password"
                color="primary"
                {...register("oldPassword", {
                  required,
                })}
                error={!!errors.oldPassword}
                helperText={
                  !!errors.oldPassword
                    ? errors?.oldPassword?.message?.toString()
                    : null
                }
              />
              <TextField
                variant="outlined"
                type="password"
                className="auth-input"
                label="New password"
                color="primary"
                {...register("newPassword", {
                  required,
                })}
                error={!!errors.newPassword}
                helperText={
                  !!errors.newPassword
                    ? errors?.newPassword?.message?.toString()
                    : null
                }
              />
              <TextField
                variant="outlined"
                type="password"
                className="auth-input"
                label="Confirm password"
                color="primary"
                {...register("confirmPassword", {
                  required,
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "password is don't match",
                })}
                error={!!errors.confirmPassword}
                helperText={
                  !!errors.confirmPassword
                    ? errors?.confirmPassword?.message?.toString()
                    : null
                }
              />

              {loading ? (
                <LoadingButton
                  sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
                  className="loadingButton"
                  loading
                  variant="outlined"
                >
                  Login
                </LoadingButton>
              ) : (
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.9 }}
                  variant="contained"
                  sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
                  type="submit"
                  size="large"
                >
                  Change Password
                </MotionButton>
              )}
            </Box>
          </Box>
        </Modal>
      </Box >
    </>
  );
}
