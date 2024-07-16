import { useEffect, useState } from "react";
import { getMess } from "../services/apiChat";

export const useFetchLatestMessages = (chat, notifications, newMessages) => {
  const [latestMess, setLatestMess] = useState(null);

  useEffect(() => {
    const fetchLatestMessages = async () => {
      try {
        const res = await getMess(chat?._id);
        const latestMessage = res[res?.length - 1];
        setLatestMess(latestMessage);
      } catch (error) {
        console.error("Error fetching latest messages:", error);
      }
    };

    fetchLatestMessages();
  }, [newMessages, notifications, chat]);

  return { latestMess };
};
