import { ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/Auth/ForgetPasswordSlice";
import "./ForgetPassword.module.scss";
import { Helmet } from 'react-helmet'
import { toast } from "react-toastify";
import { motion } from "framer-motion"
const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const required = "This Field is required";

  const { loading } = useSelector(
    (state) => state.ForgetPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {

    const response = await dispatch(fetchData(data))
    if (response?.payload?.data?.message === "Password reset request, already sent successfully ,check your email") {
      toast.success(response.payload.data.message, {
        autoClose: 2000,
        theme: "colored",
      })
      navigate(`/reset-password`)
    } else {
      toast.error(response.payload.response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
    }

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
      <Box component="main" sx={{ padding: { xs: "20px 20px", } }}>
        <Box component="div">
          <Typography variant="h4" component="h4">
            Forgot password
          </Typography>
          <Typography>
            If you already have an account register <br />
            You can
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {/*  */} Login here !
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "90%", paddingLeft: "36px" }}
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
            Send mail <ChevronRight />
          </MotionButton>
        )}
      </Box>
    </>
  );
};

export default ForgetPassword;
