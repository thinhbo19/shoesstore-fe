import { apiUrlBrand, apiUrlProduct } from "@/services/config";
import axios from "axios";
import { getProduct } from "../fetchData/useFetchData";

export const reloadProduct = async (setFilteredList) => {
  const updatedData = await getProduct();
  setFilteredList(updatedData.data.productDatas);
};

export const deleteProduct = async (accessToken, id) => {
  try {
    const res = await axios.delete(`${apiUrlProduct}/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
