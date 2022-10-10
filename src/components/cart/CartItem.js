import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Stack,
  Typography,
  Rating,
  Button,
 
} from "@mui/material";
import { getCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { CartItems } from "../api/api";
import EditCart from "./EditCart";
// const EditCart = React.lazy(() => import('./EditCart'))

const CartItem = (cart) => {
  
  const dispatch = useDispatch();
  function deleteItem(id) {
    fetch(CartItems + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((del) => {
        dispatch(getCart());
        window.alert(del.message);
      });
  }

   return (
    <Stack direction="row">
      <Stack>
        <Typography
          padding="10px"
          component="img"
          src={cart.cart.cart_product.image_url}
          alt="img"
          borderRadius="5px"
          sx={{ width: "170px", height: "155px" }}
        />
      </Stack>

      <Stack paddingLeft="5px" paddingTop="15px">
        <Typography component="p" paddingLeft="15px">
          <strong>{cart.cart.cart_product.name}</strong>
          <br />
          {cart.cart.cart_product.price}₹
          <br />
          <Rating value={cart.cart.cart_product.rating} readOnly />
          <br />
          Quantity: {cart.cart.cart_item.quantity}
          {cart.cart.cart_item.weight_type}
        </Typography>
        <Stack
          direction="row"
          paddingBottom="5px"
          paddingTop="5px"
          paddingLeft="8px"
        >
          <Button
            color="secondary"
            onClick={() => deleteItem(cart.cart.cart_item.id)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      <EditCart
        id={cart.cart.cart_item.id}
        weight={cart.cart.cart_item.quantity}
        type={cart.cart.cart_item.weight_type}
      />

    </Stack>
  );
};

export default CartItem;
