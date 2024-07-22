import { apiUrlUser, apiUrlVocher } from "@/services/config";
import axios from "axios";
import { getAllVoucher } from "../fetchData/useFetchData";

export const reloadVoucer = async (setFilteredList) => {
  const updatedData = await getAllVoucher();
  setFilteredList(updatedData.reverse());
};

export const postVoucher = async (
  accessToken,
  selectedNameOption,
  discountVoucher,
  expiryVoucher,
  exclusiveVoucher
) => {
  try {
    const res = await axios.post(
      `${apiUrlVocher}`,
      {
        name: selectedNameOption,
        discount: discountVoucher,
        expiry: expiryVoucher,
        exclusive: exclusiveVoucher,
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

export const deleteVoucher = async (accessToken, id) => {
  try {
    const res = await axios.delete(`${apiUrlVocher}/${id}`, {
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

export const getVouchers = async () => {
  try {
    const response = await axios.get(`${apiUrlVocher}`);
    return response.data.data;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};
export const removeVoucher = async (accessToken, voucherID) => {
  try {
    const res = axios.put(
      `${apiUrlUser}/removeCoupon`,
      {
        cpid: voucherID,
      },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};
