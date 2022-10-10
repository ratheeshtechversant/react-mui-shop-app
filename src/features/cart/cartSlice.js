import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { CartItems } from '../../components/api/api'

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";
export const getCart = createAsyncThunk("cart/getCart", async () => {
  return fetch(CartItems, {
    method: "GET",
    headers: {
      Authorization: user.authorization
    },
  }).then((response) => response.json());
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
  },
  reducers: {
    clearCart: (state, action) => {
      state.cart.length = 0;
    },
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },
  },
  extraReducers: {
    [getCart.pending]: (state, action) => {
      state.loading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    },
    [getCart.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
