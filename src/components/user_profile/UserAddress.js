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
  Menu,
  MenuItem,
  
} from "@mui/material";
import Cookies from "js-cookie";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const UserAddress = () => {
    let navigate = useNavigate();
  const [user_adresses, setUser_addresses] = useState([]);
  const [disp_info, setDisp_info] = useState("");

  const [disp_new_ads, setDisp_new_ads] = useState("none");
  const [disp_ads, setDisp_ads] = useState("none");

  const [disp_edit_ads, setDisp_edit_ads] = useState("none");
  const [disp_saved_ads, setDisp_saved_ads] = useState("");
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  // ------------FETCH ADDRESS----------------------------

  const [ads_message, setAds_message] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/addresses", {
      method: "GET",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then((address) => {
        console.log(address);
        setAds_message(address.message);
        setUser_addresses(address.address);
      });
  }, []);

  function addressManage() {
    setDisp_ads("");
    setDisp_info("none");
    fetch("http://127.0.0.1:3000/api/addresses", {
      method: "GET",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then((address) => {
        console.log(address);
        setAds_message(address.message);
        setUser_addresses(address.address);
      });
  }

  function showEditAdress() {
    setDisp_saved_ads("none");
    setDisp_new_ads("none");
    setDisp_edit_ads("");
  }

  function addNewAddress() {
    setDisp_new_ads("");
    setDisp_edit_ads("none");
    setDisp_saved_ads("");
  }

  function cancelEditAddress() {
    setDisp_edit_ads("none");
    setDisp_saved_ads("");
  }


  // -----------------------CREATE NEW ADDRESS--------------
  const [ads_type, setAds_type] = useState("");
  function createAddress(e) {
    e.preventDefault();
    const address = new FormData();
    address.append("address[name]", e.target.name.value);
    address.append("address[mobile]", e.target.phone.value);
    address.append("address[pincode]", e.target.pincode.value);
    address.append("address[address]", e.target.address.value);
    address.append("address[locality]", e.target.locality.value);
    address.append("address[city]", e.target.city.value);
    address.append("address[landmark]", e.target.landmark.value);
    address.append("address[alternate_mobile]", e.target.alt_phone.value);
    address.append("address[address_type]", ads_type);

    fetch("http://127.0.0.1:3000/api/addresses", {
      method: "POST",
      body: address,
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then((address) => {
        window.alert(address.message);
        addressManage();
      });
  }

  
  // -----------------DELETE ADDRESS-------------------

  const [ads_id, setAds_id] = useState();
  function deleteAddress() {
    console.log(ads_id);
    fetch("http://127.0.0.1:3000/api/addresses/" + ads_id, {
      method: "DELETE",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then((address) => {
        console.log(address.message);
        addressManage();
      });
  }
  // -----------------NEW ADDRESSS----------------------

  const new_address = (
    <Box
      sx={{
        backgroundColor: "#FFEEEE",
        padding: "15px",
        display: disp_new_ads,
      }}
    >
      <Typography variant="h6" color="primary">
        Add New Address
      </Typography>
      <br />
      <form onSubmit={(e) => createAddress(e)}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row">
            <TextField type="text" label="Name" id="name" required />
            <TextField
              type="text"
              label="Mobile no(10-digit)"
              id="phone"
              required
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField type="text" label="Pincode" id="pincode" required />
            <TextField type="text" label="Locality" id="locality" required />
          </Stack>
          <Stack>
            <TextField
              type="text"
              label="Address"
              sx={{ width: "486px" }}
              id="address"
              required
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField
              type="text"
              label="City/District/Town"
              id="city"
              required
            />
            <TextField type="text" label="State" id="state" required />
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField type="text" label="Landmark (optional)" id="landmark" />
            <TextField
              type="text"
              label="Alternate Phone (Optional)"
              id="alt_phone"
            />
          </Stack>
          <Stack>
            <FormLabel paddingTop="10ps" id="Address-type">
              Address Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="Address-type"
              name="Address-type"
              onChange={(e) => setAds_type(e.target.value)}
              
            >
              <FormControlLabel value="Home" control={<Radio />} label="Home" />
              {/* <FormControlLabel value="Office" control={<Radio />} label="Office" /> */}
            </RadioGroup>
          </Stack>
          <Stack spacing={2} direction="row">
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="text" onClick={() => setDisp_new_ads("none")}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );

  // -----------------EDIT ADDRESSS---------------------------

  const edit_address = (
    <Box
      sx={{
        backgroundColor: "#FFEEEE",
        padding: "15px",
        display: disp_edit_ads,
      }}
    >
      <Typography variant="h6" color="primary">
        Edit Address
      </Typography>
      <br />
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <TextField type="text" label="Name" />
          <TextField type="text" label="Mobile no(10-digit)" />
        </Stack>
        <Stack spacing={2} direction="row">
          <TextField type="text" label="Pincode" />
          <TextField type="text" label="Locality" />
        </Stack>
        <Stack>
          <TextField type="text" label="Address" sx={{ width: "486px" }} />
        </Stack>
        <Stack spacing={2} direction="row">
          <TextField type="text" label="City/District/Town" />
          <TextField type="text" label="State" />
        </Stack>
        <Stack spacing={2} direction="row">
          <TextField type="text" label="Landmark (optional)" />
          <TextField type="text" label="Alternate Phone (Optional)" />
        </Stack>
        <Stack>
          <FormLabel paddingTop="10ps" id="Address-type">
            Address Type
          </FormLabel>
          <RadioGroup row aria-labelledby="Address-type" name="Address-type">
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            {/* <FormControlLabel value="Office" control={<Radio />} label="Office" /> */}
          </RadioGroup>
        </Stack>
        <Stack spacing={2} direction="row">
          <Button variant="contained">Save</Button>
          <Button variant="text" onClick={cancelEditAddress}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );

  const menu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorMenu)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleCloseMenu}>
        <Button variant="text" onClick={showEditAdress}>
          Edit
        </Button>
      </MenuItem>
      <MenuItem onClick={handleCloseMenu}>
        <Button variant="text" onClick={deleteAddress}>
          Delete
        </Button>
      </MenuItem>
    </Menu>
  );

  // ---------------------MANAGE ADDRESS--------------------

  const manage_address = (
    <Box>
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h6"> Manage Address</Typography>
        </Stack>
        <Box>
          <Button startIcon={<AddIcon />} onClick={addNewAddress}>
            Add new Address
          </Button>
        </Box>
        {new_address}

        {edit_address}
        <Box sx={{ border: 1, borderRadius: "5px", display: disp_saved_ads }}>
          {ads_message === "no addess prsent" ? (
            <Stack padding="6px">
              <Typography variant="body2">No Address Added Yet</Typography>
            </Stack>
          ) : (
            <>
              {user_adresses.map((ads) => (
                <Stack key={ads.id}>
                  <Stack direction="row">
                    <Typography
                      variant="body1"
                      sx={{ flexGrow: 1, padding: "6px" }}
                    >
                      <strong>{ads.address_type}</strong>
                    </Typography>
                    {ads_message === "no addess prsent" ? (
                      ""
                    ) : (
                      <>
                        <Button onClick={handleOpenMenu}>
                          <MoreVertIcon onClick={() => setAds_id(ads.id)} />
                        </Button>

                        {menu}
                      </>
                    )}
                  </Stack>

                  <Stack padding="6px">
                    <Typography variant="body2">
                      {ads.name}, {ads.mobile}
                    </Typography>
                    <Typography>{ads.address}</Typography>
                    <Typography>{ads.pincode}</Typography>
                    <Typography>
                      {ads.city}, {ads.locality}
                    </Typography>
                    <Typography>
                      {ads.landmark}, {ads.alternate_mobile}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );

  

  return (
    <div>{manage_address}</div>
  )
}

export default UserAddress