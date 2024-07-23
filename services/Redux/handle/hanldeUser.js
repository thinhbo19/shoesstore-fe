import { apiUrlUser } from "@/services/config";
import axios from "axios";
import { getAllUsers } from "../fetchData/useFetchData";

export const reloadUser = async (setFilteredList) => {
  const updatedData = await getAllUsers();
  setFilteredList(updatedData);
};

export const deleteUser = async (accessToken, id) => {
  try {
    const res = await axios.delete(`${apiUrlUser}/${id}`, {
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

export const patchIsBlockedUser = async (accessToken, uid, isBlocked) => {
  try {
    const res = await axios.patch(
      `${apiUrlUser}/adminUpdate`,
      { userId: uid, isBlocked: !isBlocked },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
  }
};

export const patchChangeRole = async (accessToken, uid, newRole) => {
  try {
    const res = await axios.patch(
      `${apiUrlUser}/changeRole`,
      { userId: uid, newRole: newRole },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getUserCurrentCart = async (accessToken) => {
  try {
    if (!accessToken) {
      return;
    }
    const res = await axios.get(`${apiUrlUser}/current`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return res.data.user.Cart;
  } catch (error) {
    console.log(error);
  }
};

export const getDeleteAllCartUser = async (accessToken) => {
  try {
    await axios.patch(`${apiUrlUser}/Cart`, null, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};

export const getUserCurrent = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrlUser}/current`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};

export const getUserById = async (accessToken, uid) => {
  try {
    const response = await axios.get(`${apiUrlUser}/${uid}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};

export const getAvatar = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrlUser}/current`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    return response.data.user.Avatar;
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
};
