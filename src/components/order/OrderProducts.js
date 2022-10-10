import React from "react";
import { Stack, Typography, Rating, Box } from "@mui/material";
const OrderProducts = ({ product, item }) => {
  // console.log(product);
  return (
    <Stack direction="row">
      <Stack>
        <Typography
          padding="10px"
          component="img"
          src={product.image_url}
          alt="img"
          borderRadius="5px"
          sx={{ width: "170px", height: "155px" }}
        />
      </Stack>
      <Stack paddingLeft="5px" paddingTop="15px" spacing={2}>
        <Typography variant="h6" paddingLeft="15px">
          <strong>{product.name}</strong>
        </Typography>
        <Typography variant="body1" paddingLeft="15px">
          {product.price}₹
        </Typography>
        <Stack paddingLeft="15px">
          <Rating value={product.rating} readOnly />
        </Stack>

        <Typography variant="body1" paddingLeft="15px">
          Quantity: {item.quantity}
          {item.weight_type}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OrderProducts;
