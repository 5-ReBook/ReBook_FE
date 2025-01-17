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
function ChatRoomPage() {
  const { id } = useParams();
  const { loginInfo } = useLoginInfo();
  const [messages, setMessages] = useState([]);
  const [chatSocket, setChatSocket] = useState(null);

  const onMessageReceived = message => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  useEffect(() => {
    AxiosInstance.get(`/chat/rooms/${id}/messages`)
      .then(response => {
        setMessages(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching messages', error);
      });
    const newChatSocket = new ChatSocket(
      id,
      loginInfo.username,
      onMessageReceived
    );
    newChatSocket.connect();

    setChatSocket(newChatSocket);

    return () => {
      newChatSocket.disconnect();
    };
  }, [id]);
  return (
    <div className="chat-container">
      <ChatHeader chatRoomId={id} />
      <ChatMessageList messages={messages} />
      <ChatMessageInput chatSocket={chatSocket} />
    </div>
  );
}

export default ChatRoomPage;
