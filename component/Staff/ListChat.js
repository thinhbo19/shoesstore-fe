import React, { useCallback } from "react";
import { Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { unreadNotificationFunc } from "@/utils/NotificationFunc";
import { useFetchLatestMessages } from "@/hooks/useFetchLatestMessages";
import DOMPurify from "dompurify";

const ListChat = ({
  filteredUserChatList,
  searchTerm,
  handleChange,
  hanldeUpdateUserChat,
  HandleLogout,
  onlineUsers,
  notifications,
  setNotifications,
  newMessages,
}) => {
  const chatIds = filteredUserChatList.map((user) => user.chatId);
  const { latestMessages } = useFetchLatestMessages(
    chatIds,
    notifications,
    newMessages
  );

  const thisIsUserNotifications = useCallback(
    (userId) => {
      const unreadNotifications = unreadNotificationFunc(notifications);
      return unreadNotifications?.filter((n) => n.senderId === userId) || [];
    },
    [notifications]
  );

  const handleIsOnline = useCallback(
    (userId) => onlineUsers.some((onlineUser) => onlineUser.userId === userId),
    [onlineUsers]
  );

  const markThisUserNotificationsAsRead = useCallback(
    (userNotifications) => {
      if (!Array.isArray(notifications)) {
        console.error("notifications is not an array:", notifications);
        return;
      }

      const mNotifications = notifications.map((el) => {
        const notification = userNotifications.find(
          (n) => n.senderId === el.senderId
        );

        if (notification) {
          return { ...el, isRead: true };
        }

        return el;
      });

      setNotifications(mNotifications);
    },
    [notifications, setNotifications]
  );

  return (
    <div className="listchat__container">
      <div className="title_btn_chat">
        <p className="title__chat">Đoạn chat</p>
        <button className="btn_addChat">Đoạn chat mới</button>
      </div>
      <div className="search-container">
        <Search className="icon__search" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
      </div>
      <div className="listchat__main">
        {filteredUserChatList.map((user) => {
          const latestMess = latestMessages[user.chatId];
          return (
            <div
              key={user._id}
              className="listchat__item"
              onClick={() => {
                hanldeUpdateUserChat(user._id);
                const userNotifications = thisIsUserNotifications(user._id);
                if (userNotifications.length !== 0) {
                  markThisUserNotificationsAsRead(userNotifications);
                }
              }}
            >
              <div className="listchat__img">
                <Avatar
                  src={user.Avatar}
                  className="avatar__listchat"
                  sx={{ width: 56, height: 56 }}
                />
                <div
                  className={handleIsOnline(user._id) ? "dot__online" : null}
                ></div>
              </div>
              <div className="listchat__info">
                <div className="username__mess">
                  <p className="username__listchat">{user.username}</p>
                  <div
                    className="mess"
                    dangerouslySetInnerHTML={{
                      __html: latestMess
                        ? DOMPurify.sanitize(latestMess.text)
                        : "No message yet",
                    }}
                  />
                </div>
                <div className="listchat__date">
                  <p className="date__listchat">19/03/2003</p>
                  {thisIsUserNotifications(user._id).length > 0 && (
                    <p className="notification__listchat">
                      {thisIsUserNotifications(user._id).length}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="icon__logoutAdmin"
        onClick={HandleLogout}
      />
    </div>
  );
};

export default ListChat;
