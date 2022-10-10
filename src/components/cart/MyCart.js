import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserAddress from "../user/UserAddress";
import { Paper, Box, Stack, Typography, Button } from "@mui/material";
import { getCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { placeOrder } from "./cartFunctions";

const MyCart = () => {
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.cart.cart.products);
  const message = useSelector((state) => state.cart.cart.message);
    
  let total = 0;
  let total_amount = 0;
  let delivery_charges = 0;
  let delivery_address = "";
  const tax_percent = 5;
  let tax = 0;
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const delAddress = (ads) => {
    delivery_address = ads;
  };

  if (message === "present") {
    carts.map((cart) => {
      console.log(cart.cart_item);
      let tot = 0;
      if (cart.cart_item.weight_type === "Kg") {
        tot = cart.cart_item.quantity * cart.cart_product.price;
      } else {
        tot = (cart.cart_item.quantity * cart.cart_product.price) / 1000;
      }
      total = total + tot;
    });
    tax = (total * tax_percent) / 100;
    total_amount = tax + total;
  }


  const confirmOrder = () => {
    placeOrder(
      total,
      total_amount,
      tax,
      delivery_charges,
      delivery_address,
      dispatch
    );
  };

  return (
    <Box>
      <Stack spacing={2} direction="row">
        <Stack minWidth="600px" width="800px" spacing={2}>
          <UserAddress getDelAds={delAddress} />

          {message === "present" ? (
            carts &&
            carts.map((cart, index) => (
              <Paper key={index}>
                <CartItem cart={cart} />
              </Paper>
            ))
          ) : (
            <Paper>
              <Typography padding="10px">Cart empty</Typography>
            </Paper>
          )}
        </Stack>
        <Stack sx={{ flexGrow: 1 }} minWidth="250px">
          <Paper>
            <Typography variant="h6" padding="6px">
              PRICE DETAILS
            </Typography>
            <hr />
            <Stack direction="row" padding="6px">
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                Price({message === "present" && carts.length} of items)
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
                disabled={message !== "present" ? false : carts.length === 0 ? true : false}
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

export default MyCart;
