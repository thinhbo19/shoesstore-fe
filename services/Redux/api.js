import axios from "axios";
import { apiUrlOrder, apiUrlProduct, apiUrlUser } from "../config";

export const getUserFavorites = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrlUser}/current`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });

    return response.data.user.Favorites;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy danh sách yêu thích:", error);
    throw error;
  }
};
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${apiUrlProduct}`);
    return response.data.productDatas;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy danh sách sản phẩm:", error);
    throw error;
  }
};

export const getCart = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrlUser}/current`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return response.data.user.Cart;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};

export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${apiUrlOrder}/admin`);
    return res.data.response;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};

export const getOrderDetail = async (accessToken, oid) => {
  try {
    const res = await axios.get(`${apiUrlOrder}/${oid}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res.data.response;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};
