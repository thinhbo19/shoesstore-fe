import { getUserById } from "@/services/Redux/handle/hanldeUser";
import { useEffect, useState } from "react";

export const useFetchRecipient = (chat, userId, accessToken) => {
  const [recipientUser, setRecipientUser] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== userId);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;
      const res = await getUserById(accessToken, recipientId);
      setRecipientUser(res);
    };
    getUser();
  }, [recipientId, accessToken]);
  return { recipientUser };
};
