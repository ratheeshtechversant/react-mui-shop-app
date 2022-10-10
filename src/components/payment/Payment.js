import { Box, Button, Stack, Typography, Tabs, Tab, List, ListItem, ListItemButton, TextField } from "@mui/material";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const Payment = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="basic tabs example">
            <Tab label="UPI" value="1" />
            <Tab label="CREDIT/DEBIT/ATM CARD" value="2" />
            <Tab label="NET BANKING" value="3" />
            <Tab label="Cash On Delivery" value="4"/>
          </TabList>
        </Box>
        <TabPanel value="1">
          <List>
            <ListItem>
              <Button >PhonePe</Button>
            </ListItem>
            <ListItem>
              <Button>Your UPI Id</Button>
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel value="2">
          <Stack>
            <TextField label="Enter Card No" sx={{width:250}}/>
          </Stack>
          <Stack direction="row"></Stack>
        </TabPanel>
        <TabPanel value="3">3</TabPanel>
        <TabPanel value="4">4</TabPanel>

      </TabContext>
    </Box>
  );
};

export default Payment;
