import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Products } from '../../components/api/api'
export const getProduct = createAsyncThunk("products/getProduct", async () => {
  return fetch(Products).then((response) =>
    response.json()
  );
});

const ptoductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {} = ptoductSlice.actions;

export default ptoductSlice.reducer;
