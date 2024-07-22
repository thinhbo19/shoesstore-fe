import axios from "axios";
import { apiUrlOrder } from "../config";

const API_BASE_URL = "http://localhost:8000";

export const getUserFavorites = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/current`, {
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
    const response = await axios.get(`${API_BASE_URL}/product`);
    return response.data.productDatas;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy danh sách sản phẩm:", error);
    throw error;
  }
};
export const getAvatar = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/current`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return response.data.user.Avatar;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};
export const getCart = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/current`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return response.data.user.Cart;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};
export const getAllOrder = async (accessToken) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/order/admin`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
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
