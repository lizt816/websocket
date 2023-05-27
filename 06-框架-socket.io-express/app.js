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

app.use('/',express.static('pulice'))

io.on('connection', function (socket) {
 socket.on( 'setUserInfo' , function (data) {
  // 判断是否登录成功
  let user = userList.indexOf(data.userName)
  let message = '注册成功'
  let info = data
  info.time = new Date().toLocaleTimeString()
  if(user > -1){
   info = userInfoList[user]
   message = '登录成功'
  } else{
   userList.push(data.userName)
   userInfoList.push(info)
  }
  socket.userName = data.userName
  socket.emit('getUserInfo', { 
   code:200,
   data:info,
   message
  });
  io.emit('addUser', { 
   code:200,
   data:info,
   message
  })
  io.emit('userInfoList', { 
   code:200,
   data:userInfoList,
   message:'所有用户'
  })
 });

 socket.on('messageImg',(data)=>{
  io.emit('messageImg', { 
   code:200,
   data,
   message:'发送成功'
  })
 })

 socket.on('userSendMessage',(data)=>{
  io.emit('userSendMessage', { 
   code:200,
   data,
   message:'发送成功'
  })
 })

 socket.on('disconnect', ()=>{ 
  // 有人退出时，触发
  if(!socket.userName)return;
   let idx = userList.indexOf(socket.userName)  // 匹配到当前用户
   io.emit('delUser', { 
    code:200,
    data:userInfoList[idx],
    message:'退出了聊天'
   })
   userList.splice(idx,1)
   userInfoList.splice(idx,1)
   io.emit('userInfoList', { 
    code:200,
    data:userInfoList,
    message:'所有用户'
   })
});
})


