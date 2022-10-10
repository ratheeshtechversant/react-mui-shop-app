import { Stack, Button, Modal, Box } from "@mui/material";
import Cookies from "js-cookie";
import Payment from "../payment/Payment";

import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  minHeight: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const OrderAgain = ({orderagin,confirmOrder }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function orderAgain() {
    setOpen(false);
    confirmOrder(true)
  }
  return (
    <>
      {orderagin && (
        <Stack direction="row" padding="6px">
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%" }}
            onClick={handleOpen}
          >
            Confirm Re-Order
          </Button>
        </Stack>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            spacing={2}
          >
            {/* <Stack>Are you sure?</Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={orderAgain}
              >
                confirm
              </Button>
            </Stack> */}
            <Payment />
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default OrderAgain;
