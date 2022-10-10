import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  
} from "@mui/material";
import { useLocation,useNavigate } from "react-router-dom";
import UserAddress from "./user/UserAddress";
import BuyNowItem from "./BuyNowItem";
import Cookies from "js-cookie";


const BuyNow = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [total,setTotal] = useState(0)
  const [tax,setTax] = useState(0)
  const [total_amount,setTotal_amount] = useState(0)
  const [weight, setWeight] = useState(1);
  const [type, setType] = useState("Kg");
  let delivery_charges = 0;
  let delivery_address = "";
  const tax_percent = 5;
  const delAddress = (ads) => {
    delivery_address = ads;
  };

  const findTotal = (weight,type) => {
    setWeight(weight)
    setType(type)
    if(type === "Kg"){
      setTotal(location.state.attributes.price * weight)
    }
    else{
      setTotal((location.state.attributes.price * weight)/1000)
    }
    setTax((total * tax_percent)/100)
    setTotal_amount(total + tax)
  }

  function confirmOrder(){
    const data = new FormData();
    data.append("order[product_id]", location.state.attributes.id);
    data.append("order[quantity]", weight);
    data.append("order[weight_type]", type);
    data.append("order[delivery_charges]", delivery_charges);
    data.append("order[delivery_address]", delivery_address);
    data.append("order[total_amount]", total);
    data.append("order[tax]", tax);
    data.append("order[total_to_pay]", total_amount);
    data.append("order[status]", "active");
    if(delivery_address){
    fetch("http://127.0.0.1:3000/api/orders/0/buynow", {
      method: "POST",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: data
    })
      .then((response) => response.json())
      .then((order) => {
        window.alert(order.message)
        console.log(order)
        if(order.message === "order placed"){
          navigate("/orderdetails")
        }
      });}
      else{
        window.alert("Please set delivery location")
      }
  }
  return (
    <Box>
      <Stack spacing={2} direction="row">
        <Stack minWidth="600px" width="800px" spacing={2}>
          <UserAddress getDelAds={delAddress} />
          <Paper>
            <BuyNowItem product={location.state.attributes} getWeight={findTotal}/>
          </Paper>
          
        </Stack>
        <Stack sx={{ flexGrow: 1 }} minWidth="250px">
          <Paper>
            <Typography variant="h6" padding="6px">
              PRICE DETAILS
            </Typography>
            <hr />
            <Stack direction="row" padding="6px">
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Price(1 item)
              </Typography>
              <Typography variant="body2">{total}</Typography>
            </Stack>
            <Stack direction="row" padding="6px">
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Tax({tax_percent}%)
              </Typography>
              <Typography variant="body2">{tax}</Typography>
            </Stack>
            <Stack direction="row" padding="6px">
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Delivery Charges
              </Typography>
              <Typography variant="body2">0.00</Typography>
            </Stack>
            <hr />
            <Stack direction="row" padding="6px">
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                <strong>Total Amount</strong>
              </Typography>
              <Typography variant="body2">
                <strong>{total_amount}</strong>
              </Typography>
            </Stack>
            <br />
            <Stack direction="row" padding="6px">
              <Button
                sx={{ flexGrow: 1 }}
                variant="contained"
                color="secondary"
                onClick={confirmOrder}
              >
                Place Order
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BuyNow;
