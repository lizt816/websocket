// chatgpt提供的多人聊天方法 待测试

const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // 将新连接的客户端添加到 clients 集合中
  clients.add(ws);

  // 监听客户端发送的消息
  ws.on('message', (message) => {
    // 广播消息给所有连接的客户端
    broadcast(message);
  });

  // 监听连接断开事件
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    // 在连接断开时从 clients 集合中移除客户端
    clients.delete(ws);
  });
});

function broadcast(message) {
  // 遍历所有连接的客户端，发送消息
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

console.log('WebSocket server listening on port 8080');
