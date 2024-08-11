import { setCateID, setProductId } from "@/services/Redux/product/productSlice";

export const handleProductID = (dispatch, productID) => {
  dispatch(setProductId(productID));
};
export const handleCateID = (dispatch, categoryID) => {
  dispatch(setCateID(categoryID));
};
