import { apiUrlBrand, apiUrlCategory, apiUrlProduct } from "@/services/config";
import axios from "axios";

export const getCategory = async () => {
  try {
    const res = await axios.get(`${apiUrlCategory}/`);
    return res.data.prodCategory;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const getBrand = async () => {
  try {
    const res = await axios.get(`${apiUrlBrand}/`);
    return res.data.Brands;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const getProduct = async () => {
  try {
    const res = await axios.get(`${apiUrlProduct}/`);
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const getProductByIdCate = async (categoryID) => {
  try {
    const res = await axios.get(`${apiUrlProduct}?category=${categoryID}`);
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const getProductByIdProduct = async (productID) => {
  try {
    const res = await axios.get(`${apiUrlProduct}/${productID}`);
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
