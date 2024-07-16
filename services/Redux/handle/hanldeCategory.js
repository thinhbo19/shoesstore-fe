import { apiUrlCategory } from "@/services/config";
import axios from "axios";
import { getCategory } from "../fetchData/useFetchData";

export const reloadCate = async (setFilteredList) => {
  const updatedData = await getCategory();
  setFilteredList(updatedData.reverse());
};

export const postCategory = async (accessToken, categoryName) => {
  try {
    const res = await axios.post(
      `${apiUrlCategory}`,
      {
        categoryName: categoryName,
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

export const deleteCategory = async (accessToken, categoryID) => {
  try {
    const res = await axios.delete(`${apiUrlCategory}/${categoryID}`, {
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

export const putCategory = async (accessToken, categoryName, cateId) => {
  try {
    const res = await axios.put(
      `${apiUrlCategory}/${cateId}`,
      {
        categoryName: categoryName,
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
