import React, { useEffect, useState } from 'react';
import './ChatRoomListPage.css';
import ChatRoomList from '../../components/Chat/ChatRoomList';
import AxiosInstance from '../../api/AxiosInstance';

const chats = [
  {
    id: 1,
    name: '이서준(더미)',
    message: '확인했습니다 :)',
    imageUrl: 'path/to/image1.jpg',
  },
  {
    id: 2,
    name: '최수빈(더미)',
    message: '감사합니다!! 조심히 가세요!',
    imageUrl: 'path/to/image2.jpg',
  },
  {
    id: 3,
    name: '오수아(더미)',
    message: '네넵 수고하세요',
    imageUrl: 'path/to/image3.jpg',
  },
  {
    id: 4,
    name: '신도윤(더미)',
    message: '혹시 판매됐나요?',
    imageUrl: 'path/to/image4.jpg',
  },
  {
    id: 5,
    name: '김서윤(더미)',
    message: '잘쓰세요~~',
    imageUrl: 'path/to/image5.jpg',
  },
  {
    id: 6,
    name: '신서윤(더미)',
    message: '후면 사진 한번 볼 수 있을까요?',
    imageUrl: 'path/to/image6.jpg',
  },
  {
    id: 7,
    name: '김서윤(더미)',
    message: '내일 거래 가능하세요?',
    imageUrl: 'path/to/image7.jpg',
  },
  {
    id: 8,
    name: '이수아(더미)',
    message: '이번 주 금요일에 뵙겠습니다!',
    imageUrl: 'path/to/image8.jpg',
  },
  {
    id: 9,
    name: '최하은(더미)',
    message: '제품 상태좀 볼 수 있을까요?',
    imageUrl: 'path/to/image9.jpg',
  },
];

const ChatRoomListPage = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    AxiosInstance.get('/chat/me/rooms')
      .then(response => {
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
};

export default ChatRoomListPage;
