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
  Avatar,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdrepeat, setPwdrepeat] = useState("");
  const [profilepic, setProfilepic] = useState([]);

  console.log(profilepic);
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
  console.log(profilepic);
  function submitForm(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("user[email]", email);
    data.append("user[password]", pwd);
    data.append("user[password_confirmation]", pwdrepeat);
    data.append("user[image]", event.target.image.files[0]);
    submitToAPI(data);
  }

  function submitToAPI(data) {
    if (pwd === pwdrepeat && pwd.length >= 6) {
      fetch("http://127.0.0.1:3000/users", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOpen(true);
        })
        .catch((error) => console.error(error));
    } else {
      window.alert("password mismatch or password length should be >= 6");
    }
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
        <form onSubmit={(e) => submitForm(e)}>
          <Stack spacing={4}>
            <Typography variant="h4">Signup</Typography>
            <TextField
              id="email"
              label="email"
              variant="outlined"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={!email}
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
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              error={!pwd}
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
              required
              value={pwdrepeat}
              onChange={(e) => setPwdrepeat(e.target.value)}
              error={!pwdrepeat}
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
              <TextField id="image" type="file" required />
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

export default Signup;
