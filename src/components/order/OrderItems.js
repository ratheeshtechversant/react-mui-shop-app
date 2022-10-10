import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Box, Paper, Stack, Typography } from "@mui/material";
import OrderProducts from "./OrderProducts";
import PriceDetails from "./PriceDetails";
import { StepperCancelled, StepperDelivered } from "./componets";

const OrderItems = () => {
  const [order, setOrder] = useState([]);
  const location = useLocation();
  console.log(location.state.orderagain);
  let active_step = 0;
  if (location.state.order.status === "active") {
    active_step = 1;
  }
  if (location.state.order.status === "shipped") {
    active_step = 2;
  }
  if (location.state.order.status === "delivered") {
    active_step = 3;
  }
  let ads = location.state.order.delivery_address
    ? location.state.order.delivery_address.split(",")
    : ["address"];
  //   console.log(ads);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/order_items/" + location.state.order.id, {
      method: "GET",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((itemdetails) => setOrder(itemdetails.orderItem));
  }, []);

  const stepperCancelled = <StepperCancelled />;
  const stepperDelivered = <StepperDelivered activeStep={active_step} />;
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Stack>
          <Paper>
            <Stack
              sx={{
                width: "100%",
                minWidth: 250,
                padding: "10px",
              }}
              spacing={2}
            >
              <Typography variant="h6" color="secondary">
                <strong>Delivery Address</strong>
              </Typography>
              <Box>
                {ads.map((ads) => (
                  <Typography variant="body2">{ads},</Typography>
                ))}
              </Box>
              {!location.state.orderagain && (
                <Box paddingLeft="20px">
                  {location.state.order.status === "cancelled"
                    ? stepperCancelled
                    : stepperDelivered}
                </Box>
              )}
            </Stack>
          </Paper>
        </Stack>
        <Stack spacing={2} sx={{ width: "100%", minWidth: 400 }}>
          {order.map((order) => (
            <Paper>
              <OrderProducts
                product={order.order_product}
                item={order.order_item}
              />
            </Paper>
          ))}
        </Stack>
        <Stack sx={{ width: "100%", minWidth: 250, maxWidth: 300 }}>
          <PriceDetails
            order={location.state.order}
            orderagin={location.state.orderagain}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderItems;
