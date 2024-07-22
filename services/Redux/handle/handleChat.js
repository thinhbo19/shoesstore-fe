import { apiUrlChat, apiUrlMess } from "@/services/config";
import axios from "axios";

export const createChat = async () => {
  try {
    const res = await axios.post(`${apiUrlChat}`);
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const findChat = async (userid) => {
  try {
    const res = await axios.get(`${apiUrlChat}/${userid}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const deleteChat = async (chatId) => {
  try {
    const res = await axios.delete(`${apiUrlChat}/${chatId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const getChat = async (userid) => {
  try {
    const res = await axios.get(`${apiUrlChat}/${userid}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const getMess = async (chatId) => {
  try {
    const res = await axios.get(`${apiUrlMess}/${chatId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const postMess = async (chatId, textMess, userId) => {
  try {
    const res = await axios.post(`${apiUrlMess}`, {
      chatId: chatId,
      senderId: userId,
      text: textMess,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const findOneChat = async (adminId, userid) => {
  try {
    const res = await axios.get(`${apiUrlChat}/find/${adminId}/${userid}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
