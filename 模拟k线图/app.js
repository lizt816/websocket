const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const server = app.listen(8080, () => {
  console.log('Server started on port 8080');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});