import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class ChatSocket {
  constructor(chatRoomId, senderUsername, onMessageReceived) {
    this.chatRoomId = chatRoomId;
    this.senderUsername = senderUsername;
    this.onMessageReceived = onMessageReceived;
    this.stompClient = null;
    this.reconnectAttempts = 0;
  }

  connect(senderUsername) {
    console.log('Connecting...');
    try {
      const socket = new SockJS(
        `${import.meta.env.VITE_BASE_URL}/chat/ws/stomp`
      );
      this.stompClient = Stomp.over(socket);
    } catch (e) {
      e.printStackTrace();
    }

    this.stompClient.connect(
      {},
      frame => {
        console.log('Connected:', frame);

        this.stompClient.subscribe(
          `/chat/sub/room/${this.chatRoomId}`,
          message => {
            const recv = JSON.parse(message.body);
            if (this.onMessageReceived) {
              this.onMessageReceived(recv);
            }
          }
        );

        this.stompClient.send(
          '/chat/pub/message',
          {},
          JSON.stringify({
            type: 'ENTER',
            roomId: this.chatRoomId,
            senderUsername: this.senderUsername,
          })
        );
      },
      error => {
        console.error('Failed to connect:', error);
        if (this.reconnectAttempts++ <= 5) {
          setTimeout(() => {
            console.log('Reconnecting...');
            this.connect(senderUsername);
          }, 10000); // 10 seconds
        }
      }
    );
  }

  sendMessage(message) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/chat/pub/message',
        {},
        JSON.stringify({
          type: 'TALK',
          roomId: this.chatRoomId,
          senderUsername: this.senderUsername,
          message: message,
        })
      );
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}

export default ChatSocket;
