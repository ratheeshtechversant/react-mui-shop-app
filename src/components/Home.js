import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getCart } from "../features/cart/cartSlice";

const Home = () => {

  let url = `url(https://www.shutterstock.com/image-photo/healthy-food-background-vegan-vegetarian-600w-1610617150.jpg)`;
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("user")) {
      dispatch(getCart());
    }
  }, []);
  
  // console.log(useSelector((state) => state.user[0]))

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/categories")
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  }, []);

  return (
    <>
      <Box sx={{ padding: "10px" }}>
        <Paper sx={{ height: "50px" }}>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              padding: "7px",
            }}
          >
            {categories.map((category) => (
              <Button color="secondary" variant="text">
                {category.category}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Box>

      <Box sx={{ padding: "10px" }}>
        <Paper
          sx={{ height: "400px" }}
          style={{
            backgroundImage: url,
            backgroundSize: "cover",
          }}
        >
          <Stack
            spacing={4}
            sx={{
              alignItems: "",
              justifyContent: "",
              width: "50%",
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              sx={{ paddingLeft: "50px", paddingTop: "50px" }}
            >
              FRESH TO HOME
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{
                paddingLeft: "50px",
              }}
            >
              Fitness starts at home. What you eat is what you will look, just
              as what you sow is what you reap. Eat good food: eat fruits,
              vegetables, healthy grains
            </Typography>
          </Stack>
        </Paper>
      </Box>
      <Box sx={{ padding: "10px" }}>
        <Paper sx={{ height: "50px" }}></Paper>
      </Box>

      
    </>
  );
};

export default Home;
