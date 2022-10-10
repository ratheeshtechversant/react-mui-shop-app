import React from "react";
import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
} from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchComponent";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import ProductItem from "./ProductItem";

const Products = () => {
  const prod = useSelector((state) => state.products)

  const [products, setProduct] = useState(prod.products);
  const [products_1, setProduct_1] = useState(prod.products);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/categories")
      .then((response) => response.json())
      .then((categories) => setCategories(categories));
  }, []);

  function findCategory(cat_id, cat_name) {
    let category_prod = products_1.filter(function (pro) {
      if (pro.attributes.category_id === cat_id) {
        return pro;
      }
    });
    setProduct(category_prod);
  }

  function searchProduct(name) {
    let search_prod = products_1.filter(function (pro) {
      if (pro.attributes.name.toLowerCase().includes(name.toLowerCase())) {
        return pro;
      }
    });
    setProduct(search_prod);
  }

  
  return (
    <>
      <Box minWidth="970px">
        <Paper sx={{ height: "50px" }}>
          <Stack direction="row">
            <Stack
              direction="row"
              spacing={4}
              sx={{
                flexGrow: 1,
                padding: "7px",
              }}
            >
              {categories.map((category) => (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => findCategory(category.id, category.category)}
                >
                  {category.category}
                </Button>
              ))}
              <Button color="secondary" onClick={() => setProduct(products_1)}>
                all-product
              </Button>
            </Stack>
            <Stack padding="5px">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="secondary" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  type="search"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => searchProduct(e.target.value)}
                />
              </Search>
            </Stack>
          </Stack>
        </Paper>
      </Box>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        Products
      </Typography>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={3}
        columns={{ xs: 1, sm: 3, md: 4 }}
      >
        <ProductItem products={products}/>
      </Grid>
    </>
  );
};

export default Products;
