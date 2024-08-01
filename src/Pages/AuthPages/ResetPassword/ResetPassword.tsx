import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ResetPassword.module.scss";
import { useDispatch } from "react-redux";
import { handleResetPassword } from "@/Redux/Features/Auth/ResetPasswordSlice";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion"
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const required = "This Field is required";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setloading(true)
    const response = await dispatch(handleResetPassword(data))
    if (response?.payload?.data?.message === "Invalid verification code") {
      setloading(false)
      toast.success(response.payload.data.message, {
        autoClose: 2000,
        theme: "colored",
      })
      navigate(`/login`)
    } else {
      setloading(false)
      toast.error(response.payload.response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
    }

  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const MotionButton = motion(Button)
  return (
    <>
      <Helmet>
        <title> Reset Password • Staycation</title>
      </Helmet>
      <Box component="header">
        <Typography
          className={`subNav`}
          variant="h4"
          component="div"
          color="initial"
        >
          <Typography
            variant=""
            className="blueColor"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Stay
          </Typography>
          cation.
        </Typography>
      </Box>
      <Box component="main" sx={{ padding: { xs: "20px", md: "15px 70px" } }}>
        <Box component="div">
          <Typography variant="h4" component="h4">
            Reset Password
          </Typography>
          <Typography>
            If you already have an account register <br /> You can
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login here !
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "80%", margin: "auto" }}
      >
        <TextField
          variant="outlined"
          type="email"
          className="auth-input"
          label="Email"
          color="primary"
          {...register("email", {
            required,
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is InValid",
            },
          })}
          error={!!errors.email}
          helperText={
            !!errors.email ? errors?.email?.message?.toString() : null
          }
        />
        <TextField
          variant="outlined"
          type="text"
          className="auth-input"
          label="OTP"
          color="primary"
          {...register("seed", {
            required,
          })}
          error={!!errors.seed}
          helperText={!!errors.seed ? errors?.seed?.message?.toString() : null}
        />

        <TextField
          variant="outlined"
          type={showPassword ? "text" : "password"}
          className="auth-input"
          label="Password"
          color="primary"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password", {
            required,
          })}
          error={!!errors.password}
          helperText={
            !!errors.password ? errors?.password?.message?.toString() : null
          }
        />

        <TextField
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          className="auth-input"
          label="Confirm password"
          color="primary"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("confirmPassword", {
            required,
            validate: (value) =>
              value === getValues("password") || "password is don't match",
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
            Send mail
          </LoadingButton>
        ) : (
          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            variant="contained"
            sx={{
              width: "100%",
              mt: 2,
              padding: { lg: ".5em" },
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1rem",
              },
            }}
            type="submit"
            size="large"
          >
            Reset
          </MotionButton>
        )}
      </Box>
    </>
  );
};

export default ResetPassword;
