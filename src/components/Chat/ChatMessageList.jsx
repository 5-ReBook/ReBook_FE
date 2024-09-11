import React from 'react';
import { useLoginInfo } from '../../provider/LoginInfoProvider';

import './ChatMessageList.css';
import { dateStringToMessageTime } from '../../utils/dateUtil';

const ChatMessageItem = ({ message, isUser }) => (
  <li className={`message ${isUser ? 'user-message' : 'other-message'}`}>
    <div className="message-text">{message.message}</div>
    <div className="message-time">
      {dateStringToMessageTime(message.createdAt)}
    </div>
    {/* isUser가 false일 때만 warningMessage가 있을 경우에만 경고 메시지를 보여줍니다. */}
    {!isUser && message.warningMessage && (
      <div className="message-warning">{message.warningMessage}</div>
    )}
  </li>
);

const ChatMessageList = ({ messages }) => {
  const { loginInfo } = useLoginInfo();

  return (
    <ul className="message-list">
      {messages.map(message => (
        <ChatMessageItem
          key={message.chatMessageId}
          message={message}
          isUser={message.senderUsername === loginInfo.username}
        />
      ))}
    </ul>
  );
};

export default ChatMessageList;
