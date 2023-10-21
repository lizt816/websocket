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
  ws.on('message', (message) => { // 接收信息
    console.log(`Received message => ${message}`);
    // wss.clients.forEach((client) => {  // 传播给所有链接了的客户
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
  });
  setInterval(() => {
   ws.send(getData());
  }, 1000);
});


function getData(params) {
 let n = setNu();
return JSON.stringify({
  trade_id:setNu(),
  ts_code:new Date().getTime()+'', // trade_id                                  -- 不显示
  trade_date:setTim(), //               // 对应的列
  timestamp:setTim(),                 // 表二 对应的列
  volume:setRan(),                         //  表二的成交金额
  close:setRan(), // last_price     // 最近的成交价格         ---  -对应中间方格的底部
  open:setRan(), // session_open   // 开盘价格                ---  -对应中间方格的顶部
  high:setRan(), // session_high   // 最高价格               --- -对应竖着的线的顶部
  low:setRan(), // session_low     // 当日交易中的最低价格     --- -对应竖着的线的底部
  vol:setRan(), // last_quantity    // 成交数量               -- 不显示
  type:setRan(), // type  
})
}
function setRan() {
 return Math.floor(Math.random() * (-210 - 200 + 1) + 200);
}
function setNu() {
 let a = {
  0:"a",
  1:"s",
  2:"d",
  3:"f",
  4:"g",
 }
 return a[Math.floor(Math.random() * (4 - 0 + 1) + 0)];
}

function setTim() {
 let a = {
  0:"2023-10-21T03:05:43.000Z",
  1:"2023-10-21T03:10:43.000Z",
  2:"2023-10-21T03:15:43.000Z",
  3:"2023-10-21T03:20:43.000Z",
  4:"2023-10-21T03:25:43.000Z",
 }
 const now = new Date(); // 创建一个 Date 对象，表示当前时间
 // 使用 Date 对象的方法获取年、月、日、时、分、秒
 const year = now.getFullYear();
 const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
 const day = String(now.getDate()).padStart(2, '0');
 const hours = String(now.getHours()).padStart(2, '0');
 const minutes = String(now.getMinutes()).padStart(2, '0');
 const seconds = String(now.getSeconds()).padStart(2, '0');
 // 构建时间字符串
 const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
 return formattedTime;
}