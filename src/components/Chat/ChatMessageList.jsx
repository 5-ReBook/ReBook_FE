import React from 'react';
import { useLoginInfo } from '../../provider/LoginInfoProvider';

import './ChatMessageList.css';
import { dateStringToMessageTime } from '../../utils/dateUtil';

const ChatMessageItem = ({ message, isUser }) => {
  return (
    <li className={`message ${isUser ? 'user-message' : 'other-message'}`}>
      <div className="message-text">{message.message}</div>
      <div className="message-time">
        {dateStringToMessageTime(message.createdAt)}
      </div>
    </li>
  );
};

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
