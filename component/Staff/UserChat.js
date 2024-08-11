import { useFetchRecipient } from "@/hooks/useFetchRecipient";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import "../../Styles/staff/Staff.css";
import { formatDate } from "@/hooks/useFormatTime";
import { unreadNotificationFunc } from "@/utils/NotificationFunc";

const UserChat = ({
  currentChat,
  uid,
  accessToken,
  messages,
  htmlDescription,
  setHtmlDescription,
  messagesEndRef,
  sendTextMess,
  handleOpenNotification,
  openNoti,
  notifications,
  allUser,
  markAllNotificationAsRead,
  markNotificationAsRead,
  userChats,
}) => {
  const { recipientUser } = useFetchRecipient(currentChat, uid, accessToken);
  const editorRef = useRef(null);
  const unreadNotifications = unreadNotificationFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUser.find((user) => user._id === n.senderId);

    return {
      ...n,
      senderName: sender?.username,
    };
  });

  return (
    <div className="userchat__container">
      {recipientUser ? (
        <>
          <div className="userchat__info">
            <div className="userchat__name">
              <Avatar
                src={recipientUser.Avatar}
                sx={{ width: 56, height: 56 }}
              />
              <p className="userchat_username">{recipientUser.username}</p>
            </div>
            <div className="userchat__notification">
              <FontAwesomeIcon
                className="userchat__notification__icon"
                icon={faBell}
                onClick={() => handleOpenNotification()}
              />

              {unreadNotifications?.length === 0 ? null : (
                <div className="notification__length">
                  <p className="number__not">{unreadNotifications.length}</p>
                </div>
              )}

              {openNoti && (
                <div className="notifications__field">
                  <div className="notification__title">
                    <p className="title__noti">Thông báo</p>
                    <p
                      className="read__all"
                      onClick={() => markAllNotificationAsRead(notifications)}
                    >
                      Đọc tất cả
                    </p>
                  </div>
                  <div className="notification__list">
                    {modifiedNotifications?.length === 0 ? (
                      <div className="notification__not">
                        <p className="notification__notsend">
                          Chưa có tin nhắn được gửi
                        </p>
                      </div>
                    ) : null}

                    {modifiedNotifications &&
                      modifiedNotifications.map((n, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              n.isRead
                                ? "notification__item"
                                : "notification__item notRead"
                            }
                            onClick={() =>
                              markNotificationAsRead(
                                n,
                                userChats,
                                uid,
                                notifications
                              )
                            }
                          >
                            <p className="notification__username">
                              {n.senderName} gửi tin nhắn cho bạn
                            </p>
                            <p className="notification__date">
                              {formatDate(n.date)}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="userchat__mess">
            {messages &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mess ${
                    message.senderId === uid ? "client" : "server"
                  }`}
                >
                  <div
                    className={
                      message.senderId === uid
                        ? "messFromClient"
                        : "messFromServer"
                    }
                  >
                    <div
                      className="mess_p"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(message.text),
                      }}
                    />
                  </div>
                  <p className="mess_date">{formatDate(message.createdAt)}</p>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="userchat__input">
            <Editor
              value={htmlDescription}
              onEditorChange={(content) => {
                setHtmlDescription(content);
              }}
              apiKey="06txmbmjzqjj2tbcgqgwvs8xzubupbhjzun5zodh0as2q07u"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Nhập tin nhắn</p>"
              init={{
                height: 100,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                statusbar: false,
              }}
            />

            <button className="senderbtn" onClick={() => sendTextMess()}>
              Gửi
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserChat;
