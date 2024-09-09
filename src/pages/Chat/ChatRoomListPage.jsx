import React, { useEffect, useState } from 'react';
import './ChatRoomListPage.css';
import ChatRoomList from '../../components/Chat/ChatRoomList';
import AxiosInstance from '../../api/AxiosInstance';

function ChatRoomListPage() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    AxiosInstance.get('/chat/me/rooms')
      .then(response => {
        console.log(response.data.result);
        setChatRooms(response.data.result);
      })
      .catch(error => {
        console.error('Failed to fetch chat rooms:', error);
      });
  }, []);

  return (
    <div className="chat-list">
      <h2 className="chat-list-title">채팅</h2>
      <ChatRoomList chatRooms={chatRooms} />
    </div>
  );
}

export default ChatRoomListPage;
