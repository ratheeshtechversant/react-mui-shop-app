import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const OederItemDetails = ({ order, index,orderCancel_1 }) => {
  // console.log(order);
  let navigate = useNavigate();
  function orderCancel(id) {
    fetch("http://127.0.0.1:3000/api/orders/" + id, {
      method: "PATCH",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((ordercancel) => {
        window.alert(ordercancel.message);
        window.location.reload(false);
        // orderCancel_1(ordercancel.message)
      });
  }

  const active = (
    <Stack spacing={2}>
      <Typography variant="body2" color="#009900">
        <strong>Active</strong>
      </Typography>
      <Typography variant="body2">item onthe way</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => orderCancel(order.id)}
      >
        cancel
      </Button>
    </Stack>
  );
  const cancelled = (
    <Stack spacing={2}>
      <Typography variant="body2" color="#ff0000">
        <strong>Cancelled</strong>
      </Typography>
      <Typography variant="body2">order cancelled</Typography>
    </Stack>
  );
  const delivered = (
    <Stack spacing={2}>
      <Typography variant="body2" color="#009900">
        <strong>Delivered</strong>
      </Typography>
      <Typography variant="body2">item delivered</Typography>
    </Stack>
  );

  return (
    <Stack padding="10px" direction="row" spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h6" color="secondary">
          Order-{index + 1}
        </Typography>
        <Typography variant="body2" sx={{ paddingBottom: "5px" }}>
          Price : {order.total_to_pay}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/orderitems", { state: {order, orderagain: false} })}
        >
          Order Details
        </Button>
      </Stack>
      {order.status === "active" && active}
      {order.status === "cancelled" && cancelled}
      {order.status === "delivered" && delivered}
      <Stack>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() =>
            navigate("/reorder", { state: {order, orderagain: true} })
          }
        >
          Order Again
        </Button>
      </Stack>
    </Stack>
  );
};

export default OederItemDetails;
