import { fetchDataStart } from "@/Redux/Features/Auth/RegisterSlice";
import baseUrl from "@/utils/Custom/Custom";
import { ChevronRight, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchData } from "../../../Redux/Features/Auth/LoginSlice";
import { motion } from "framer-motion"
import "./Login.module.scss";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, islogged } = useSelector((state) => state.login);
  const required = "This Field is required";
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback(
    async (data: { email: string; password: string }) => {
      dispatch(fetchData(data));
    },
    [dispatch]
  );

  if (islogged === "admin") {
    navigate("/dashboard");
  } else if (islogged === "user") {
    navigate("/");
  }
  useEffect(() => {
    dispatch(fetchDataStart(false));
  }, [dispatch]);

  function handleCallbackResponse(response: any) {
    localStorage.setItem("authToken", response.credential);
    const accessToken = localStorage.getItem("authToken");
    baseUrl
      .post("/api/v0/portal/users/auth/google", { accessToken })
      .then((res) => {
        localStorage.setItem("authToken", res.data.data.token);
        localStorage.setItem("userRole", res.data.data.user.role);
        localStorage.setItem("userId", res.data.data.user._id);
        navigate("/dashboard");
        toast.success(res.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch((error) =>
        toast.error(error, {
          autoClose: 2000,
          theme: "colored",
        })
      );
  }

  useEffect(() => {
    const google = window.google;
    google.accounts.id.initialize({
      client_id:
        "761128849378-ee7o8qlsfc5j6a1hik63auo1oq037hs5.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);


  const handleTestCode = (e: any) => {
    e.preventDefault()

    if (testCode === "realmadrid") {
      setShow(true)
      toast.success("Choose account Kind", {
        autoClose: 2000,
        theme: "colored",
      });


    } else {
      setShow(false)
      toast.error("Wrong Code", {
        autoClose: 2000,
        theme: "colored",
      })
    }

  }
  const [radioCheckedAdmin, setRadioCheckedAdmin] = useState(false);
  const [radioCheckedUser, setRadioCheckedUser] = useState(false);

  useEffect(() => {
    if (radioCheckedAdmin) {
      setValue("email", "mm0766633@gmail.com")
      setValue("password", "@Password123!")
    }
    if (radioCheckedUser) {
      setValue("email", "mostafamahmoudd04@gmail.com")
      setValue("password", "@Password123!")
    }

  }, [radioCheckedAdmin, radioCheckedUser])


  const [testCode, setTestCode] = useState("")
  const [show, setShow] = useState(false)


  const handleRadioChangeAdmin = (e: any) => {
    setRadioCheckedAdmin(e.target.checked);
  };

  const handleRadioChangeUser = (e: any) => {
    setRadioCheckedUser(e.target.checked);
  };


  const MotionButton = motion(Button)




  return (
    <>
      <Helmet>
        <title> Sign in • Staycation</title>
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
      <Box component="main" className="loginContainer">
        <Box component="div">
          <Typography variant="h4" component="h4">
            Sign in
          </Typography>
          <Typography>
            If you don’t have an account register <br /> You can
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register here !
            </Link>
          </Typography>
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          className="authBox"
          sx={{ padding: { xs: "1rem" } }}
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
            className=""
            label="Password"
            color="primary"
            fullWidth
            type={showPassword ? "text" : "password"}
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

          <Box
            className="loginLinks"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Landing ?
            </Link>
            <Link
              to="/forget-password"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Forget Password
            </Link>
          </Box>
          {loading ? (
            <LoadingButton
              sx={{ width: "100%", padding: "10px", marginTop: "20px" }}
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
              sx={{
                width: "100%",
                mt: 2,
                mb: 2,
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
              Login <ChevronRight />
            </MotionButton>
          )}
          <div id="signInDiv"></div>
          <Box component={"form"} className="testContainer">
            <TextField
              variant="outlined"
              className="testInput"
              type="password"
              label="test Code"
              color="secondary"
              size="small"
              onChange={(e) => {
                setTestCode(e.target.value)
              }}
            />
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              className="testButton"
              variant="contained"
              onClick={() => handleTestCode(event)}
              size="small"
            >
              Submit
            </MotionButton>
            <Box
              className={`${show ? "show" : "hide"} `}>
              <Box className="inputWrapper">
                <label htmlFor="admin" >Admin</label>
                <input type="radio" name="check " id="admin"
                  checked={radioCheckedAdmin}
                  onChange={handleRadioChangeAdmin}
                  className="radioInput" />
              </Box>
              <Box className="inputWrapper">
                <label htmlFor="user">User</label>
                <input type="radio" name="check " id="user"
                  checked={radioCheckedUser}
                  onChange={handleRadioChangeUser}
                  className="radioInput" />
              </Box>


            </Box>
          </Box>
        </Box>
      </Box >
    </>
  );
};

export default Login;
