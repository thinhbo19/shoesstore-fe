import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productID: null,
    categoryID: null,
  },
  reducers: {
    setProductId: (state, action) => {
      state.productID = action.payload;
    },
    setCateID: (state, action) => {
      state.categoryID = action.payload;
    },
  },
});

export const { setProductId, setCateID } = productSlice.actions;

export const selectProductID = (state) => state.product.productID;
export const selectCateID = (state) => state.product.categoryID;

export default productSlice.reducer;
