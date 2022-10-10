import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import Cookies from "js-cookie";

const ProfileInfo = () => {
  const [user_information, setUser_info] = useState({});
  const [edit_personal, setEdit_p] = useState(false);
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";
  const [gender, setGender] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/user_informations", {
      method: "GET",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then((info) => {
        setUser_info(info);
        setGender(info.gender);
      });
  }, []);

  const [open, setOpen] = useState(false);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  function submitPersonalInfo(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("user_information[first_name]", e.target.firstname.value);
    data.append("user_information[last_name]", e.target.lastname.value);
    data.append("user_information[gender]", gender);
    data.append("user_information[mobile]", e.target.phone.value);

    fetch("http://127.0.0.1:3000/api/user_informations", {
      method: "POST",
      body: data,
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOpen(true);
        setUser_info(data.userinfo);
        setEdit_p(false);
      })
      .catch((error) => console.error(error));
  }

  let readonly_true = {
    disabled: true,
  };

  return (
    <form onSubmit={(event) => submitPersonalInfo(event)}>
      <Box>
        <Stack direction="row" marginBottom="15px" spacing={3}>
          <Typography variant="h6">Personal Info</Typography>
          {edit_personal ? (
            <>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button variant="text" onClick={() => setEdit_p(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="outlined" onClick={() => setEdit_p(true)}>
              edit
            </Button>
          )}
        </Stack>
        <FormLabel>Name</FormLabel>
        {edit_personal ? (
          <Stack spacing={2} direction="row">
            <TextField
              type="text"
              defaultValue={user_information.first_name}
              id="firstname"
            />
            <TextField
              type="text"
              defaultValue={user_information.last_name}
              id="lastname"
            />
          </Stack>
        ) : (
          <Stack spacing={2} direction="row">
            <TextField
              type="text"
              value={user_information.first_name}
              inputProps={readonly_true}
            />
            <TextField
              type="text"
              value={user_information.last_name}
              inputProps={readonly_true}
            />
          </Stack>
        )}
        <br />
        <Stack>
          <FormLabel id="radio-button">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons"
            name="row-radio-buttons-group"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {edit_personal ? (
              <>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </>
            ) : (
              <>
                <FormControlLabel
                  value="female"
                  control={<Radio disabled />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio disabled />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio disabled />}
                  label="Other"
                />
              </>
            )}
          </RadioGroup>
        </Stack>
        <br />
        <Stack>
          <FormLabel>Phone</FormLabel>
          {edit_personal ? (
            <TextField
              type="text"
              sx={{ width: "235px" }}
              defaultValue={user_information.mobile}
              id="phone"
            />
          ) : (
            <TextField
              type="text"
              sx={{ width: "235px" }}
              value={user_information.mobile}
              inputProps={readonly_true}
            />
          )}
        </Stack>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          updated successfully{" "}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ProfileInfo;
