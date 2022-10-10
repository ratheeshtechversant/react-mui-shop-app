import React from "react";
import { useState } from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";
import Cookies from "js-cookie";
import SettingsIcon from "@mui/icons-material/Settings";
import ArchiveIcon from "@mui/icons-material/Archive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import LogoutIcon from "@mui/icons-material/Logout";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import UserAddress from "./UserAddress";

const Profile = () => {
  let navigate = useNavigate();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";
  const [ads_info, setAds_info] = useState(false);

  function signOut() {
    fetch("http://127.0.0.1:3000/users/sign_out", {
      method: "DELETE",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then(
        !Cookies.remove("user") ? navigate("/") : window.alert("sign-out faild")
      );
  }

  return (
    <>
      <Box>
        <Stack direction="row" spacing={2}>
          <Stack spacing={2}>
            <Paper sx={{ width: "300px", height: "60px", padding: "15px" }}>
              <Stack direction="row" spacing={3}>
                <Box>
                  <Typography
                    component="img"
                    src={user.image_url}
                    alt="user"
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
                <Box paddingTop="3px">
                  <Typography>Hey,</Typography>
                  <Typography variant="h6">{user.email}</Typography>
                </Box>
              </Stack>
            </Paper>
            <Paper sx={{ width: "300px", padding: "15px" }}>
              <Stack spacing={2}>
                <Box>
                  <Button startIcon={<ArchiveIcon />} onClick={() => navigate("/orderdetails")}>MY ORDERS</Button>
                </Box>
                <Box>
                  <Button startIcon={<SettingsIcon />}>ACCOUNT SETTINGS</Button>
                  <Box paddingLeft="25px">
                    <Button onClick={() => setAds_info(false)}>
                      PROFILE INFO
                    </Button>
                    <br />
                    <Button onClick={() => setAds_info(true)}>
                      MANAGE ADDRESS
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Button startIcon={<FolderSharedIcon />}>MY STUFF</Button>
                  <Box paddingLeft="25px">
                    <Button>My reviews & ratings</Button>
                    <br />
                    <Button>ALL Notifications</Button>
                    <br />
                    <Button>MY WHISHLIST</Button>
                  </Box>
                </Box>
                <Box>
                  <Button
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => navigate("/mycart")}
                  >
                    MY CART
                  </Button>
                </Box>
                <Box>
                  <Button startIcon={<LogoutIcon />} onClick={signOut}>
                    LOG OUT
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Stack>
          <Stack sx={{ flexGrow: 1 }}>
            <Paper sx={{ padding: "15px" }}>
              {ads_info ? <UserAddress /> : <ProfileInfo />}
            </Paper>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
