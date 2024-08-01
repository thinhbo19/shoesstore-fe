"use client";
import React from "react";
import "../ChatBox/ChatBox.css";
import Image from "next/image";
import Mess from "../../assets/mess.png";
import { useRouter } from "next/navigation";

const ChatBotMessenger = () => {
  const router = useRouter();
  const handlePush = () => {
    router.push("https://m.me/394058487122884?ref=w27982029");
  };
  return (
    <div className="chatbot_mess">
      <Image
        onClick={handlePush}
        src={Mess}
        alt="chatbot_mess"
        width={65}
        height={65}
      />
    </div>
  );
};

export default ChatBotMessenger;
