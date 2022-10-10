import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ChangeAddress({ addresses, getChangedAds }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function changeAds(index) {
    //   window.alert(id)
    getChangedAds(index);
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="text" color="secondary">
        Change
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {addresses.map((address, index) => (
            <>
              {" "}
              <Paper sx={{padding:2,cursor:"pointer"}}>
                <Typography onClick={() => changeAds(index)}>
                  {address.name} &nbsp; {address.mobile} <br />
                  {address.address},{address.city},<br />{address.pincode}
                </Typography>
              </Paper>
              <br />
            </>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
