import { useEffect, useState } from "react";
import { getUsersForChat } from "../services/apiUser";

export const useFetchRecipient = (chat, userId, accessToken) => {
  const [recipientUser, setRecipientUser] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== userId);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;
      const res = await getUsersForChat(accessToken, recipientId);
      setRecipientUser(res);
    };
    getUser();
  }, [recipientId, accessToken]);
  return { recipientUser };
};
