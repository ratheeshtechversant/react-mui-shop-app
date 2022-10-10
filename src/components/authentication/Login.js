import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { SignIn } from '../api/api'

// import { getCart } from "../../features/cart/cartSlice";
const schema = Yup.object().shape({
  email: Yup.string()
    .required("email required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "invalid email"),
  password: Yup.string()
    .required("password required")
    .min(6, "invalid(minimum length 6)"),
});

const Login = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleClickShowPassword() {
    setVisible(!visible);
  }
  function onSubmit(data) {
    console.log(data);
    axios
      .post(SignIn, {
        user: data,
      })
      .then((result) => {
        // window.alert("Email : " + result.data.user.email);
        console.log(result)
        Cookies.set(
          "user",
          JSON.stringify({
            id: result.data.image_url.id,
            email: result.data.image_url.email,
            authorization: result.headers.authorization,
            image_url: result.data.image_url.image_url,
          }),
          { expires: 7 }
        );
        dispatch(
          setUser({
            id: result.data.image_url.id,
            email: result.data.image_url.email,
            authorization: result.headers.authorization,
            image_url: result.data.image_url.image_url,
          })
        );
        setOpen(true);
        const timer = setTimeout(() => {
          navigate("/");
        }, 1000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        window.alert(error.response.data.error);
        console.log(error);
      });
  }
  

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#eeeeee",
        height: "90vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "30px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Typography variant="h4">Sign-Up</Typography>
            <TextField
              id="email"
              label="email"
              variant="outlined"
              type="email"
              {...register("email")}
              error={!!errors?.email}
              helperText={errors.email ? errors.email.message : null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon></EmailIcon>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="password"
              label="password"
              variant="outlined"
              type={visible ? "password" : "text"}
              {...register("password")}
              error={!!errors?.password}
              helperText={errors.password ? errors.password.message : null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
              Login
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Login Success!
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
