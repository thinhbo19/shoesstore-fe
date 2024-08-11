"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../Styles/staff/Staff.css";
import ListChat from "./ListChat";
import UserChat from "./UserChat";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessToken,
  selectUid,
  setLogout,
} from "@/services/Redux/user/useSlice";
import {
  findChat,
  findOneChat,
  getMess,
  postMess,
} from "@/services/Redux/handle/handleChat";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import io from "socket.io-client";
import { getAllUsers } from "@/services/Redux/fetchData/useFetchData";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

const Staff = () => {
  const uid = useSelector(selectUid);
  const accessToken = useSelector(selectAccessToken);
  const [userChats, setUserChats] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [filteredUserChatList, setFilteredUserChatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState(null);
  const [htmlDescription, setHtmlDescription] = useState("");
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const [openNoti, setOpenNoti] = useState(false);

  const handleOpenNotification = () => {
    setOpenNoti(!openNoti);
  };

  const HandleLogout = () => {
    dispatch(setLogout());
    router.push("/dang-nhap");
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    socket.on("getOnlineUser", (res) => {
      setOnlineUsers(res);
    });
  }, [socket, uid]);

  useEffect(() => {
    if (!socket || !newMessages) return;
    const recipientId = currentChat?.members?.find((id) => id !== uid);
    socket.emit("sendMess", { ...newMessages, recipientId });
  }, [newMessages, currentChat, uid, socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getMess", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId);
      if (isChatOpen) {
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
  }, [currentChat, socket, notifications]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await getAllUsers();
        const allChat = await findChat(uid);
        setAllUser(allUsers);
        setUserChats(allChat);
        const memberList = allChat.map((chat) => chat.members).flat();
        const uniqueMembers = [...new Set(memberList)].filter(
          (member) => member !== uid
        );

        const userChatData = uniqueMembers
          .map((memberId) => {
            const user = allUsers.find((user) => user._id === memberId);
            const chat = allChat.find((chat) =>
              chat.members.includes(memberId)
            );
            return {
              ...user,
              chatId: chat ? chat._id : null,
            };
          })
          .filter((user) => user._id);

        if (!searchTerm) {
          setFilteredUserChatList(userChatData);
        } else {
          setFilteredUserChatList(
            userChatData.filter((user) =>
              user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [uid, searchTerm, allUser]);

  useEffect(() => {
    if (!currentChat?._id) return;

    const fetchChatMessages = async () => {
      try {
        const res = await getMess(currentChat._id);
        setMessages(res);
        scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const hanldeUpdateUserChat = useCallback(
    async (userId) => {
      try {
        const res = await findOneChat(uid, userId);
        setCurrentChat(res);
        scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    },
    [uid]
  );

  const sendTextMess = async () => {
    if (htmlDescription.trim() === "") {
      Swal.fire({
        icon: "info",
        text: "Please enter a message before sending.",
      });
      return;
    }
    try {
      const res = await postMess(currentChat?._id, htmlDescription, uid);
      setNewMessages(res);
      setMessages((prevMessages) => [...prevMessages, res]);
      scrollToBottom();
      setHtmlDescription("");
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        icon: "error",
        text: "An error occurred while sending the message. Please try again.",
      });
    }
  };

  const handleLinkChat = (chatId) => {
    router.push(`/customer-servicer/${chatId}`);
  };

  const markAllNotificationAsRead = useCallback((notifications) => {
    const mNotifications = notifications.map((n) => {
      return { ...n, isRead: true };
    });
    setNotifications(mNotifications);
  }, []);

  const markNotificationAsRead = useCallback(
    (n, userChats, user, notifications) => {
      const desiredChat = userChats.find((chat) => {
        const chatMembers = [user, n.senderId];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });
      if (desiredChat) {
        const userId = desiredChat.members.find(
          (member) => member !== user._id
        );
        const mNotifications = notifications.map((el) => {
          if (n.senderId === el.senderId) {
            return { ...n, isRead: true };
          } else {
            return el;
          }
        });

        hanldeUpdateUserChat(userId);
        setNotifications(mNotifications);
      } else {
        console.error("Desired chat not found for notification:", n);
      }
    },
    [hanldeUpdateUserChat, setNotifications]
  );

  return (
    <div className="staff__container">
      <ListChat
        filteredUserChatList={filteredUserChatList}
        searchTerm={searchTerm}
        handleChange={handleChange}
        hanldeUpdateUserChat={hanldeUpdateUserChat}
        handleLinkChat={handleLinkChat}
        HandleLogout={HandleLogout}
        onlineUsers={onlineUsers}
        notifications={notifications}
        setNotifications={setNotifications}
        newMessages={newMessages}
      />
      <UserChat
        currentChat={currentChat}
        uid={uid}
        accessToken={accessToken}
        messages={messages}
        htmlDescription={htmlDescription}
        setHtmlDescription={setHtmlDescription}
        messagesEndRef={messagesEndRef}
        sendTextMess={sendTextMess}
        handleOpenNotification={handleOpenNotification}
        openNoti={openNoti}
        notifications={notifications}
        allUser={allUser}
        markAllNotificationAsRead={markAllNotificationAsRead}
        markNotificationAsRead={markNotificationAsRead}
        userChats={userChats}
      />
    </div>
  );
};

export default Staff;
