import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/Auth/RegisterSlice";
import "./Register.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Helmet } from 'react-helmet'
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion"
const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isRegister, loading } = useSelector((state) => state.register);
  const navigate = useNavigate();
  const required = "This Field is required";
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(fetchData(data));
  };
  useEffect(() => {
    if (isRegister) {
      navigate("/login");
    }
  }, [isRegister, navigate]);
  const MotionButton = motion(Button)
  return (
    <>
      <Helmet>
        <title> Sign up • Staycation</title>
      </Helmet>
      <Box component="header">
        <Typography
          className={`subNav`}
          variant="h4"
          component="div"
          color="initial"
          sx={{ fontSize: { xs: "clamp(2rem, 5vw, 3rem)" } }}
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
            Sign up
          </Typography>
          <Typography>
            If you already have an account register
            <br /> You can
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
        <Box component={"form"}
          onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            type="text"
            className="auth-input"
            label="User Name"
            color="primary"
            {...register("userName", {
              required,
            })}
            error={!!errors.userName}
            helperText={
              !!errors.userName ? errors?.userName?.message?.toString() : null
            }
          />

          <Box className="inputsContainer">
            <TextField
              variant="outlined"
              type="tel"
              className="auth-input"
              label="Phone Number"
              color="primary"
              {...register("phoneNumber", {
                required,
                pattern: {
                  value: /^01[0125][0-9]{8}$/,
                  message:
                    "Phone number must start with 01 and be 11 digits in total",
                },
              })}
              error={!!errors.phoneNumber}
              helperText={
                !!errors.phoneNumber
                  ? errors?.phoneNumber?.message?.toString()
                  : null
              }
            />

            <TextField
              variant="outlined"
              type="text"
              className="auth-input"
              label="Country"
              color="primary"
              {...register("country", {
                required,
                minLength: {
                  value: 3,
                  message: "minlength 3 letters",
                },
              })}
              error={!!errors.country}
              helperText={
                !!errors.country ? errors?.country?.message?.toString() : null
              }
            />
          </Box>

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
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*0-9]).{5,}$/,
                message:
                  "password must be 5 char, contains one uppercase letter, one lowercase letter, and  special char or number",
              },
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
          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              width: "100%",
              mt: 2,
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
                md: "1rem",
              },
            }}
          >
            Upload Profile Image
            <VisuallyHiddenInput
              type="file"
              {...register("profileImage")}
              error={!!errors.profileImage}
              helperText={
                !!errors.profileImage
                  ? errors?.profileImage?.message?.toString()
                  : null
              }
            />
          </MotionButton>

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
              Sign up
            </MotionButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Register;
