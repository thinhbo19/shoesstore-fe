import { apiUrlBrand } from "@/services/config";
import axios from "axios";
import { getBrand } from "../fetchData/useFetchData";

export const reloadBrand = async (setFilteredList) => {
  const updatedData = await getBrand();
  setFilteredList(updatedData.reverse());
};

export const postBrand = async (accessToken, brandName) => {
  try {
    const res = await axios.post(
      `${apiUrlBrand}`,
      {
        brandName: brandName,
      },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const deleteBrand = async (accessToken, id) => {
  try {
    const res = await axios.delete(`${apiUrlBrand}/${id}`, {
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

export const putCategory = async (accessToken, brandName, Id) => {
  try {
    const res = await axios.put(
      `${apiUrlBrand}/${Id}`,
      {
        brandName: brandName,
      },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
