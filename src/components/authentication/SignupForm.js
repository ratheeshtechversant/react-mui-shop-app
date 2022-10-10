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
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignUp } from "../api/api";

const SignupForm = () => {
  const [visible, setVisible] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  let password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    // console.log(data);
    const user_data = new FormData();
    user_data.append("user[email]", data.email);
    user_data.append("user[password]", data.password);
    user_data.append("user[password_confirmation]", data.re_password);
    user_data.append("user[image]", data.image[0]);
    submitToAPI(user_data);
  };

  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  function handleClickShowPassword() {
    setVisible(!visible);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  function submitToAPI(data) {
    fetch(SignUp, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(true);
      })
      .catch((error) => console.error(error));
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
            <Typography variant="h4">Signup</Typography>
            <TextField
              id="email"
              label="email"
              variant="outlined"
              type="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
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
              {...register("password", {
                required: "required",
                minLength: {
                  value: 6,
                  message: "minimum length is 6",
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
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
            <TextField
              id="password-repeat"
              label="Repeat password"
              variant="outlined"
              type={visible ? "password" : "text"}
              {...register("re_password", {
                required: "required",
                minLength: {
                  value: 6,
                  message: "minimum length is 6",
                },
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
              error={!!errors?.re_password}
              helperText={
                errors?.re_password ? errors.re_password.message : null
              }
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
            <Stack spacing={1} direction="row">
              <TextField
                id="image"
                type="file"
                {...register("image", { required: "required" })}
                error={!!errors?.image}
                helperText={errors?.image ? errors.image.message : null}
              />
            </Stack>
            <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
              Signup
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
                signed in successfully{" "}
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupForm;
