import React from "react";
import { formatDate } from "../../hooks/useFormatTime";

const ChatBoxMess = ({ uid, messages, messagesEndRef }) => {
  return (
    <div className="chatbox__messages">
      {messages &&
        messages.map((m) => (
          <div
            key={m._id}
            className={m.senderId === uid ? "mess_client" : "mess_server"}
          >
            <pre>{m.text}</pre>
            <p className="timemess">{formatDate(m.createdAt)}</p>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBoxMess;
