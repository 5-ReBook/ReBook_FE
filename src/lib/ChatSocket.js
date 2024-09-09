import Stomp from 'stompjs';

class ChatSocket {
  constructor(chatRoomId, senderUsername, onMessageReceived) {
    this.chatRoomId = chatRoomId;
    this.senderUsername = senderUsername;
    this.onMessageReceived = onMessageReceived;
    this.stompClient = null;
    this.reconnectAttempts = 0;
  }

  connect() {
    console.log('Connecting...');

    const wsUrl = this.convertHttpToWs(
      `${import.meta.env.VITE_BASE_URL}/chat/ws/stomp`
    );
    const socket = new WebSocket(wsUrl);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect(
      {},
      frame => {
        console.log('Connected:', frame);

        this.stompClient.subscribe(
          `/chat/sub/room/${this.chatRoomId}`,
          message => {
            const recv = JSON.parse(message.body);
            if (this.onMessageReceived) {
              if (this.senderUsername !== recv.senderUsername)
                this.readMessage(recv.chatMessageId);
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
          message,
        })
      );
    }
  }

  readMessage(messageId) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/chat/pub/message',
        {},
        JSON.stringify({
          type: 'READ',
          roomId: this.chatRoomId,
          senderUsername: this.senderUsername,
          chatMessageId: messageId,
        })
      );
    }
  }

  disconnect() {
    if (this.stompClient) {
      // WebSocket이 아직 연결 중인지 확인
      if (this.stompClient.ws.readyState === WebSocket.OPEN) {
        this.stompClient.disconnect();
      } else {
        console.warn(
          'WebSocket is not open. Current state:',
          this.stompClient.ws.readyState
        );
        // WebSocket이 여전히 연결 중인 경우, 연결이 완료된 후에 disconnect를 호출하도록 설정
        this.stompClient.ws.onopen = () => {
          console.log('WebSocket is now open, disconnecting...');
          this.stompClient.disconnect();
        };
      }
    }
  }

  convertHttpToWs(url) {
    return url.replace(/^http/, 'ws');
  }
}

export default ChatSocket;
