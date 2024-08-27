import React, { useState } from 'react';

import './ChatMessageInput.css';

const ChatMessageInput = ({ chatSocket }) => {
  const [message, setMessage] = useState('');

  const sendMessage = event => {
    event.preventDefault();
    if (message.trim() !== '') {
      chatSocket.sendMessage(message);
      setMessage('');
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
