import React from "react";
import OrderAgain from "./OrderAgain";
import { Paper,Stack, Typography} from "@mui/material";

const PriceDetails = ({ order, orderagin }) => {
  
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
            {order.delivery_charges ? order.delivery_charges : "Free"}
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
        
        {/* <OrderAgain id={order.id}  orderagin={orderagin}/> */}
      </Paper>
    </Stack>
  );
};

export default PriceDetails;
