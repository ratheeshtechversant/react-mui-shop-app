import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Stack,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { getCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const EditCart = (props) => {
  const [weight1, setWeight] = useState(props.weight);
  const [type1, setType] = useState(props.type);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("cart_items[quantity]", weight1);
    data.append("cart_items[weight_type]", type1);
    fetch("http://127.0.0.1:3000/api/cart_items/" + props.id, {
      method: "PATCH",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert(data.message);
        if (data.message == "cart item updated") {
          dispatch(getCart());
        }
      });
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Stack spacing={2} paddingLeft="25px" paddingTop="15px">
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
        <Stack direction="row" paddingBottom="5px">
          <Button color="secondary" variant="contained" type="submit">
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditCart;
