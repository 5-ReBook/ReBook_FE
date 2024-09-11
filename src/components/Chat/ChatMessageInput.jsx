import React, { useState } from 'react';

import './ChatMessageInput.css';

const ChatMessageInput = ({ chatSocket }) => {
  const [message, setMessage] = useState('');

  const sendMessage = event => {
    event.preventDefault();
    if (message.trim() !== '') {
      if (
        chatSocket &&
        chatSocket.stompClient &&
        chatSocket.stompClient.connected
      ) {
        chatSocket.sendMessage(message);
        setMessage('');
      } else {
        console.warn('Chat socket is not connected. Message not sent.');
      }
    }
  };

  return (
    <form className="message-input" onSubmit={sendMessage}>
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">➤</button>
    </form>
  );
};

export default ChatMessageInput;
