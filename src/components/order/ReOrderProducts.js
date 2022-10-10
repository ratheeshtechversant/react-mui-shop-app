import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Stack,
  Typography,
  Rating,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

const ReOrderProducts = ({ product ,pre_order,getChanges,index}) => {
    // console.log(pre_order)
  const [weight1, setWeight] = useState(pre_order.quantity);
  const [type1, setType] = useState(pre_order.weight_type);
  getChanges(weight1,type1,index);

  return (
    <Stack direction="row" spacing={3}>
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

      <Stack  paddingTop="15px" spacing={2} >
        <Stack>
          <Typography variant="h5">{product.name}</Typography>
        </Stack>
        <Stack>{product.price}₹</Stack>
        <Stack>
          <Rating value={product.rating} readOnly />
        </Stack>
      </Stack>
      <Stack  paddingTop="15px" spacing={2}>
        <Stack>
          <TextField
            type="text"
            label="Weight"
            value={weight1}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </Stack>
        <Stack>
          <FormLabel paddingTop="10ps" id="weight-type">
            Address Type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="weight-type"
            name="weight-type"
            value={type1}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel value="Kg" control={<Radio />} label="Kg" />
            <FormControlLabel value="G" control={<Radio />} label="G" />
          </RadioGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ReOrderProducts;
