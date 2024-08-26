import React from 'react';
import { useLoginInfo } from '../../provider/LoginInfoProvider';

import './ChatMessageList.css';

const ChatMessageItem = ({ message, isUser }) => {
  return (
    <li className={`message ${isUser ? 'user-message' : 'other-message'}`}>
      <div className="message-text">{message.message}</div>
      <div className="message-time">오후 12:45</div>
    </li>
  );
};

// Message List Component
const ChatMessageList = ({ messages }) => {
  const { loginInfo } = useLoginInfo();

  return (
    <ul className="message-list">
      {messages.map(message => (
        <ChatMessageItem
          message={message}
          isUser={message.senderUsername === loginInfo.username}
        />
      ))}
    </ul>
  );
};

export default ChatMessageList;
