import React from 'react';
import './ChatHeader.css';

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

export default ChatHeader;
