import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Address } from "../api/api";
import { useDispatch } from "react-redux";
import ChangeAddress from "./ChangeAddress";

const UserAddress = ({getDelAds}) => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";
  const dispatch = useDispatch();

  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState([]);

  const [ads_no, setAds_no] = useState(0);
  useEffect(() => {
    fetch(Address, {
      method: "GET",
      headers: {
        Authorization: user.authorization,
      },
    })
      .then((response) => response.json())
      .then((address) => {
        setAddresses(address.address);
        setAddress(address.address[ads_no]);
        
      });
  }, []);
  if(address){
    const address1 =
      address.name +
      "," +
      address.mobile +
      "," +
      address.address +
      "," +
      address.city +
      "," +
      address.pincode;
      getDelAds(address1)
  }
  
  const setChangeAds = (index) =>{
    setAddress(addresses[index])
  }

  return (
    <Stack>
      <Paper>
        <Stack padding="6px">
          <Stack direction="row">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Address
            </Typography>
            {/* <Button variant="text" color="secondary">
              Change
            </Button> */}
            {addresses && <ChangeAddress addresses={addresses} getChangedAds={setChangeAds}/>}
          </Stack>
          {addresses && <Typography component="p" sx={{ fontSize: "13px" }}>
            <Typography component="span" sx={{ fontSize: "10px" }}>
              Delivery to:-
            </Typography>
            {address.name} &nbsp; {address.mobile} <br />
            {address.address},{address.city},{address.pincode}
          </Typography>}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default UserAddress;
