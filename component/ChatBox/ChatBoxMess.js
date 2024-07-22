import React from "react";
import { formatDate } from "../../hooks/useFormatTime";
import DOMPurify from "dompurify";

const ChatBoxMess = ({ uid, messages, messagesEndRef }) => {
  return (
    <div className="chatbox__messages">
      {messages &&
        messages?.map((m, index) => (
          <div
            key={index}
            className={m?.senderId === uid ? "mess_client" : "mess_server"}
          >
            <div
              className="mess_p"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(m?.text),
              }}
            />
            <p className="timemess">{formatDate(m?.createdAt)}</p>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBoxMess;
