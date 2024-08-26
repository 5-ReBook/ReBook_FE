import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChatRoomPage.css';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatMessageList from '../../components/Chat/ChatMessageList';
import ChatMessageInput from '../../components/Chat/ChatMessageInput';
import AxiosInstance from '../../api/AxiosInstance';
import ChatSocket from '../../lib/ChatSocket';
import { useLoginInfo } from '../../provider/LoginInfoProvider';

// Main Chat Component
const ChatRoomPage = () => {
  const { id } = useParams();
  const { loginInfo } = useLoginInfo();
  const [messages, setMessages] = useState([]);
  const [chatScoket, setChatSocket] = useState(null);

  const onMessageReceived = message => {
    console.log(message);
  };

  useEffect(() => {
    AxiosInstance.get(`/chat/rooms/${id}/messages`)
      .then(response => {
        setMessages(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching messages', error);
      });
    const chatSocket = new ChatSocket(
      id,
      loginInfo.username,
      onMessageReceived
    );
    chatSocket.connect();

    setChatSocket(chatSocket);
  }, [id]);
  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatMessageList messages={messages} />
      <ChatMessageInput />
    </div>
  );
};

export default ChatRoomPage;
