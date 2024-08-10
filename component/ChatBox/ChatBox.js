"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import ChatBoxMess from "./ChatBoxMess";
import Swal from "sweetalert2";
import { unreadNotificationFunc } from "../../utils/NotificationFunc";
import {
  selectAccessToken,
  selectAdmin,
  selectUid,
} from "@/services/Redux/user/useSlice";
import { getChat, getMess, postMess } from "@/services/Redux/handle/handleChat";
import { Editor } from "@tinymce/tinymce-react";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const uid = useSelector(selectUid);
  const [userChat, setUserChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState(null);
  const [textMess, setTextMess] = useState("");
  const [notifications, setNotifications] = useState([]);
  const messagesEndRef = useRef(null);
  const unreadNotifications = unreadNotificationFunc(notifications);
  const editorRef = useRef(null);
  const accessToken = useSelector(selectAccessToken);
  const role = useSelector(selectAdmin);
  const toggleChatBox = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (!isOpen) {
      markAllNotificationAsRead();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    const newSocket = io(`${socketUrl}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", uid);
  }, [socket, uid]);

  useEffect(() => {
    if (!socket || !newMessages) return;
    const recipientId = userChat?.members?.find((id) => id !== uid);
    socket.emit("sendMess", { ...newMessages, recipientId });
  }, [newMessages, userChat, uid, socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getMess", (res) => {
      if (userChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = userChat?.members.some((id) => id === res.senderId);
      if (isChatOpen && isOpen) {
        const updatedNotifications = [
          { ...res, isRead: true },
          ...notifications,
        ];
        setNotifications(updatedNotifications);
      } else {
        const updatedNotifications = [res, ...notifications];
        setNotifications(updatedNotifications);
      }
    });

    return () => {
      socket.off("getMess");
      socket.off("getNotification");
    };
  }, [userChat, socket, isOpen, notifications]);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        if (uid) {
          const res = await getChat(uid);
          setUserChat(res[0]);
        } else {
          Swal.fire({
            icon: "info",
            text: "Please login.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserChats();
  }, [uid]);

  useEffect(() => {
    if (!userChat?._id) return;

    const fetchChatMessages = async () => {
      try {
        const res = await getMess(userChat._id);
        setMessages(res);
        scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatMessages();
  }, [userChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendTextMess = async () => {
    if (textMess.trim() === "") {
      Swal.fire({
        icon: "info",
        text: "Please enter a message before sending.",
      });
      return;
    }
    try {
      const res = await postMess(userChat._id, textMess, uid);
      setNewMessages(res);
      setMessages((prevMessages) => [...prevMessages, res]);
      setTextMess("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        icon: "error",
        text: "An error occurred while sending the message. Please try again.",
      });
    }
  };

  const markAllNotificationAsRead = useCallback(() => {
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  }, [notifications]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendTextMess();
    }
  };

  return (
    <div className="chatbox__container">
      {role === "User" && accessToken && !isOpen && (
        <div className="chatbox__icon__container">
          <FontAwesomeIcon
            icon={faCommentDots}
            className="chatbox__icon"
            alt=""
            onClick={toggleChatBox}
            style={{ color: "black", fontSize: "3rem" }}
          />
          {unreadNotifications.length > 0 && (
            <div className="chatbox__notifi__count">
              <span>{unreadNotifications.length}</span>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div className="chatbox__content">
          <div className="chatbox__header">
            <p>Customer Support Department</p>
            <FontAwesomeIcon
              className="chatbox__iconOut"
              icon={faCircleXmark}
              onClick={toggleChatBox}
            />
          </div>
          <ChatBoxMess
            uid={uid}
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
          <div className="chatbox__input">
            <Editor
              value={textMess}
              onEditorChange={(content) => {
                setTextMess(content);
              }}
              apiKey="06txmbmjzqjj2tbcgqgwvs8xzubupbhjzun5zodh0as2q07u"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Nhập tin nhắn.</p>"
              init={{
                height: 10,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table code help wordcount",
                ],
                toolbar: "",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                statusbar: false,
              }}
            />
            <button className="btn__sendermess" onClick={sendTextMess}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
