import { getMess } from "@/services/Redux/handle/handleChat";
import { useEffect, useState } from "react";

export const useFetchLatestMessages = (chatIds, notifications, newMessages) => {
  const [latestMessages, setLatestMessages] = useState({});

  useEffect(() => {
    const fetchLatestMessages = async () => {
      try {
        const messages = {};
        for (const chatId of chatIds) {
          const res = await getMess(chatId);
          const latestMessage = res[res.length - 1];
          messages[chatId] = latestMessage;
        }
        setLatestMessages(messages);
      } catch (error) {
        console.error("Error fetching latest messages:", error);
      }
    };

    fetchLatestMessages();
  }, [chatIds, notifications, newMessages]);

  return { latestMessages };
};
