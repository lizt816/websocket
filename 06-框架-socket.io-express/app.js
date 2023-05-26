let express = require('express');
var app = express() ;
var server = require('http').Server(app);
var io = require('socket.io')(server) ;
let userList = []
let userInfoList = []
server.listen(80,()=>{
 console.log('服务已开启: http://127.0.0.1:80/ ')
});
// WARNING: app.listen(80) will NOT work here!

app.use(express.static('pulice'))

app.get('/', function (req, res) {
 // res.sendFile(__dirname + '/index.html');
 res.redirect('/index.html')
});

io.on('connection', function (socket) {
 socket.on( 'setUserInfo' , function (data) {
  // 判断是否登录成功
  let user = userList.indexOf(data.userName)
  let message = '注册成功'
  let info = data
  if(user > -1){
   info = userInfoList[user]
   message = '登录成功'
   info.time = new Date().toLocaleTimeString()
  } else{
   userList.push(data.userName)
   userInfoList.push(data)
  }
  socket.emit('getUserInfo', { 
    code:200,
    data:info,
    message
   });
 });
})


