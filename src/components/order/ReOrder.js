import React, { useEffect, useReducer, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import UserAddress from "../user/UserAddress";
import ReOrderPriceDetails from "./ReOrderPriceDetails";
import { useLocation } from "react-router-dom";
import ReOrderProducts from "./ReOrderProducts";
import Cookies from "js-cookie";
import { TAX } from "../constants/constant";

const ReOrder = () => {
  const location = useLocation();
  let [delivery_address,setDelAds] = useState("")
  let org_order_cp = location.state.order;
  const [total_amount, setTotal] = useState(org_order_cp.total_amount);
  const [tax, setTax] = useState(org_order_cp.tax);
  const [total_to_pay, setTotal_amount] = useState(org_order_cp.total_to_pay);
  const [order, setOrder] = useState([]);
  const [reorder_item, setReorder_item] = useState([]);
  let reorder_items = reorder_item;

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/order_items/" + location.state.order.id, {
      method: "GET",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((itemdetails) => {
        setOrder(itemdetails.orderItem);
        setReorder_item(itemdetails.orderItem);
      });
  }, []);

  const delAddress = (ads) => {
    setDelAds(ads);
  };

  const setMsg = (msg) =>{
    window.alert(msg)
  }

  const setChanges = (weight, type, index) => {
    reorder_items[index].order_item.quantity = weight;
    reorder_items[index].order_item.weight_type = type;
    let total = 0;
    reorder_items.map((item) => {
      let tot = 0;
      if (item.order_item.weight_type === "Kg") {
        tot = item.order_item.quantity * item.order_product.price;
      } else {
        tot = (item.order_item.quantity * item.order_product.price) / 1000;
      }
      total = total + tot;
    });
    setTotal(total);
    let tax = (total * TAX) / 100;
    setTax(tax);
    setTotal_amount(tax + total);
  };
  console.log(reorder_items);
  return (
    <Box>
      <Stack spacing={2} direction="row">
        <Stack minWidth="600px" width="800px" spacing={2}>
          <Paper>
            <Typography variant="h5" color="secondary" padding="5px">
              Re-Order
            </Typography>
          </Paper>
          <UserAddress getDelAds={delAddress} />
          {order.map((items, index) => (
            <Paper key={index}>
              <ReOrderProducts
                product={items.order_product}
                pre_order={items.order_item}
                getChanges={setChanges}
                index={index}
              />
            </Paper>
          ))}
        </Stack>
        <Stack sx={{ width: "100%", minWidth: 300, maxWidth: 400 }}>
          <ReOrderPriceDetails
            order={{
              id: org_order_cp.id,
              total_amount: total_amount,
              tax: tax,
              total_to_pay: total_to_pay,
            }}
            orderagin={location.state.orderagain}
            reorder_items={reorder_items}
            delivery_address={delivery_address}
            setMsg={setMsg}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReOrder;
