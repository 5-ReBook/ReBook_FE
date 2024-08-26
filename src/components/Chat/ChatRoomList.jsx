import React, { useEffect, useState } from 'react';

import './ChatRoomList.css';
import ProfileImage from '../Common/ProfileImage';
import AxiosInstance from '../../api/AxiosInstance';
import { useLoginInfo } from '../../provider/LoginInfoProvider';
import { useNavigate } from 'react-router-dom';

const ChatRoomItem = ({ chatRoom }) => {
  const nav = useNavigate();
  const { loginInfo } = useLoginInfo();
  const [chatUser, setChatUser] = useState({
    nickname: '',
    username: '',
    storedFileName: '',
  });

  const chatRoomClickHandler = () => {
    nav(`/chat/rooms/${chatRoom.roomId}`);
  };

  useEffect(() => {
    const chatUsername =
      chatRoom.sellerUsername === loginInfo.username
        ? chatRoom.buyerUsername
        : chatRoom.sellerUsername;

    AxiosInstance.get(`/members/info/${chatUsername}`)
      .then(response => {
        setChatUser(response.data.result);
      })
      .catch(error => {
        console.error('Failed to fetch chat user info:', error);
      });
  }, []);

  return (
    <li
      key={chatRoom.roomId}
      className="chat-item"
      onClick={chatRoomClickHandler}
    >
      <ProfileImage
        src={`https://rb-dev-s3-images.s3.ap-northeast-2.amazonaws.com/profile/${chatUser.storedFileName}`} //TODO: 실제 사용자 프로필 주소로 변경
        name={chatUser.nickname || chatUser.username}
        size="sm"
      />
      <div className="chat-item-content">
        <p className="chat-item-name">
          {chatUser.nickname || chatUser.username}
        </p>
        <p className="chat-item-message">{chatRoom.lastMessage}&nbsp;</p>
      </div>
    </li>
  );
};

const ChatRoomList = ({ chatRooms }) => {
  return (
    <ul className="chat-list-items">
      {chatRooms.map(chatRoom => (
        <ChatRoomItem chatRoom={chatRoom} />
      ))}
    </ul>
  );
};

export default ChatRoomList;
