import React from 'react';
import { useParams } from 'react-router-dom';
import './ChatRoomPage.css';

// Header Component
const ChatHeader = () => (
  <div className="chat-header">
    <div className="product-info">
      <img
        src="https://avatars.githubusercontent.com/u/93255519?v=4&size=64"
        alt="product"
        className="product-image"
      />
      <div className="product-details">
        <div className="product-title">이산 수학</div>
        <div className="product-price">360,000원</div>
      </div>
    </div>
    <div className="seller-info">이서준</div>
  </div>
);

// Single Message Component
const Message = ({ text, isUser }) => (
  <div className={`message ${isUser ? 'user-message' : 'other-message'}`}>
    <div className="message-text">{text}</div>
    <div className="message-time">오후 12:45</div>
  </div>
);

// Message List Component
const MessageList = () => (
  <div className="message-list">
    <Message text="아직 판매 중인가요??" isUser={true} />
    <Message text="네 판매중입니다 ~" isUser={false} />
  </div>
);

// Message Input Component
const MessageInput = () => (
  <div className="message-input">
    <input type="text" placeholder="메시지를 입력하세요" />
    <button type="button">➤</button>
  </div>
);

// Main Chat Component
const ChatRoomPage = () => {
  const { id } = useParams();
  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatRoomPage;
