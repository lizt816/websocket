// let app = require('http').createServer(handler)   
// let io = require('socket.io')(app);
// let fs = require('fs')

// app.listen(80);
// function handler(req, res) {
 
//  fs.readFile(__dirname + '/index.html',
//  function (err, data) {
//   if (err) {
//    res.writeHead(500);
//    return res.end('Error loading index.html');
//   }
//   res.writeHead(200);
//   res .end(data);})
//  }

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//    console.log(data);
//   })
//  })


// 以上是官网的代码

// 以下是通常理解的代码
let http = require('http') 
let app = http.createServer() 


let fs = require('fs')

app.on('request',(req,res)=>{
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
   if (err) {
    res.writeHead(500);
    return res.end('Error loading index.html');
   }
   res.writeHead(200);
   res .end(data);})
})

app.listen(3000,()=>{
 console.log('服务器已启动 http://127.0.0.1:3000 ')
});


let io = require('socket.io')(app);

io.on('connection', (socket)=> {
  socket.on('emitSend', function (data) {
   socket.emit('getMessge', data);
  })
})