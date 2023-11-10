const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

let openPrice = '';
let root = 8081;
const server = app.listen(root, () => {
  console.log('Server started on port '+root+'  ws://192.168.0.107:'+root);
});

const wss = new WebSocket.Server({ server });
let timer = null;   // 只能给当个用户发送，新增的话就暂停之前的  待优化
wss.on('connection', (ws) => {
  ws.on('message', (message) => { // 接收信息
    // console.log(`Received message => ${message}`);
    // wss.clients.forEach((client) => {  // 传播给       所有链接了的客户
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
    openPrice = JSON.parse(message) ;
    clearInterval(timer)
    timer = setInterval(() => {
     ws.send(getData());
    }, 1000);
  });
});


function getData(params) {
 openPrice += Math.random() * 2 - 1; // 随机波动开盘价
 const closePrice = openPrice + (Math.random() * 4 - 2); // 随机波动收盘价
 const highPrice = Math.max(openPrice, closePrice) + (Math.random() * 4); // 随机波动最高价
 const lowPrice = Math.min(openPrice, closePrice) - (Math.random() * 4); // 随机波动最低价
 const volume = Math.floor(Math.random() * 2000) + 1000; // 随机生成成交量
 let time = new Date().toISOString();  // 
 return JSON.stringify({
  time, // 以分为单位的时间间隔
  open: openPrice,
  high: highPrice,
  low: lowPrice,
  close: closePrice,
  volume: volume,
 });
}