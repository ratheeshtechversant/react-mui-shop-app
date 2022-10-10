import React, { useState, useEffect } from "react";
import OrderAgain from "./OrderAgain";
import Cookies from "js-cookie";
import { Paper, Stack, Typography } from "@mui/material";

const ReOrderPriceDetails = ({
  order,
  orderagin,
  reorder_items,
  delivery_address,
  setMsg
}) => {
  
  let delivery_charges = 0.0;
  // const [order,setOrder] = useState({})
  const data = new FormData();
  data.append("re_order[delivery_charges]", delivery_charges);
  data.append("re_order[delivery_address]", delivery_address);
  data.append("re_order[total_amount]", order.total_amount);
  data.append("re_order[tax]", order.tax);
  data.append("re_order[total_to_pay]", order.total_to_pay);
  data.append("re_order[status]", "active");
  const confirmOrder = async (status) => {
    // console.log(reorder_items);
    if (status && order.total_amount > 0) {
     await fetch("http://127.0.0.1:3000/api/orders/0/orderAgain", {
        method: "POST",
        headers: {
          Authorization: JSON.parse(Cookies.get("user")).authorization,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((orders) => {
          console.log(orders.data);
          if (orders.message === "order created") {
            reorder_items.map((item) => {
              const data1 = new FormData();
              data1.append("re_order[product_id]", item.order_item.product_id);
              data1.append("re_order[quantity]", item.order_item.quantity);
              data1.append(
                "re_order[weight_type]",
                item.order_item.weight_type
              );
              data1.append("re_order[order_id]", 200);
              fetch(
                "http://127.0.0.1:3000/api/orders/" +
                  orders.data.id +
                  "/orderAgainItem",
                {
                  method: "POST",
                  headers: {
                    Authorization: JSON.parse(Cookies.get("user"))
                      .authorization,
                  },
                  body: data1,
                }
              )
                .then((response) => response.json())
                .then((orders) => {
                  // setMsg(orders.message);
                  console.log(orders.message);
                });
            });
            
          }
          
        });
    } else {
      window.alert("please insert quantity");
    }
    
  }

  return (
    <Stack>
      <Paper>
        <Typography variant="h6" padding="6px">
          PRICE DETAILS
        </Typography>
        <hr />
        <Stack direction="row" padding="6px">
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            Price
          </Typography>
          <Typography variant="body2">{order.total_amount}</Typography>
        </Stack>
        <Stack direction="row" padding="6px">
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            Tax(5%)
          </Typography>
          <Typography variant="body2">{order.tax}</Typography>
        </Stack>
        <Stack direction="row" padding="6px">
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            Delivery Charges
          </Typography>
          <Typography variant="body2">
            {delivery_charges ? delivery_charges : "Free"}
          </Typography>
        </Stack>
        <hr />
        <Stack direction="row" padding="6px">
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            <strong>Total Amount</strong>
          </Typography>
          <Typography variant="body2">
            <strong>{order.total_to_pay}</strong>
          </Typography>
        </Stack>

        <OrderAgain orderagin={orderagin} confirmOrder={confirmOrder} />
      </Paper>
    </Stack>
  );
};

export default ReOrderPriceDetails;
