import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  List,
  ListSubheader,
  ListItem,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import OederItemDetails from "./OederItemDetails";
import { useOrderFetch } from "../api/api-call-orders";

const OrderDetails = () => {
  const [orders, message] = useOrderFetch();
  const [cancel, setCancel] = useState("");
  // console.log(message);
  const filer = ["active", "delivered", "cancelled", "all"];
  const [orderlist, setOrderList] = useState([]);
  const [order_list, setOrder] = useState([]);
  const [heading, setHeading] = useState("ORDERS");

  function orderCancel(msg) {
    setCancel(msg);
  }

  useEffect(() => {
    setOrderList(orders);
    setOrder(orders);
  }, [orders]);

  function handleFilter(value) {
    let filter_order = orderlist.filter(function (order) {
      if (order.status === value) {
        return order;
      }
    });
    setOrder(filter_order);
    if (value === "all") {
      setHeading("ORDERS");
      setOrder(orderlist);
    } else {
      setHeading(value.toUpperCase());
    }
  }
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Stack sx={{ width: "300px" }}>
          <Paper sx={{ padding: "10px" }}>
            <Stack>
              <Stack>
                <Typography variant="h6">
                  <strong>Filters</strong>
                </Typography>
              </Stack>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  minWidth: 200,
                }}
                subheader={
                  <ListSubheader>
                    <strong>Order By Status</strong>
                  </ListSubheader>
                }
              >
                {filer.map((value) => (
                  <ListItem key={value}>
                    <Button onClick={() => handleFilter(value)}>{value}</Button>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Paper>
        </Stack>
        <Stack sx={{ minWidth: "700px" }} spacing={2}>
          <Paper>
            <Typography padding="10px" variant="h5" color="secondary">
              {heading}
            </Typography>
          </Paper>
          {message !== "empty" ? (
            order_list.map((orderlist, index) => (
              <Paper key={index}>
                <OederItemDetails
                  order={orderlist}
                  index={index}
                  orderCancel_1={orderCancel}
                />
              </Paper>
            ))
          ) : (
            <Paper>
              <Typography padding="10px">No orders</Typography>{" "}
            </Paper>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderDetails;
