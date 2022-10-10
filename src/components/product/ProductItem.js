import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Grid,
  Rating,
 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getCart } from "../../features/cart/cartSlice";


const ProductItem = (products) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  function AddCart(id){
    const data1 = new FormData();
    data1.append("cart_items[product_id]", id);
    data1.append("cart_items[quantity]", 1);
    data1.append("cart_items[weight_type]", "Kg");
    submitToCartAPI(data1)
    
  }

  function submitToCartAPI( data1) {
    fetch("http://127.0.0.1:3000/api/carts", {
      method: "POST",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: JSON.parse(Cookies.get("user")).id
    })
      .then((response) => response.json())
      .then((data) => submitToCartItemAPI(data, data1))
      .catch((error) => console.error(error));
  }

  // insert cart items
  function submitToCartItemAPI(data, data1) {
    data1.append("cart_items[cart_id]", data.id);
    // console.log(data1)
    fetch("http://127.0.0.1:3000/api/cart_items", {
      method: "POST",
      body: data1,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(getCart())
        window.alert(data.message)
        if(data.message == "alrady exist"){
            navigate("/mycart")
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
    {
      products.products.map((product) => (
        <Grid item sx={2} key={product.attributes.id}>
          <Card>
            <CardMedia
              component="img"
              sx={{
                height: "10rem",
                width: "14rem",
              }}
              image={product.attributes.image_url}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" color="#ed5a15">
                {product.attributes.name}
              </Typography>
              <Typography variant="body2" component="div">
                price:{product.attributes.price}
              </Typography>
              <Rating value={product.attributes.rating} readOnly />
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                onClick={() => navigate("/buynow", { state: product })}
              >
                BuyNow
              </Button>
              <Button
                color="secondary"
                onClick={() =>AddCart(product.attributes.id)}
              >
                AddCart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))
    }
    </>
  )
}

export default ProductItem