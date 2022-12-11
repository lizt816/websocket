// 服务器代码

let PORT = 3000
// 导入nodejs-websocket包
const ws = require('nodejs-websocket')
// 创建一个服务
console.log(ws,"****")
const server = ws.createServer((connection)=> {
    console.log('new connection 创建一个链接，有用户链接了')
    connection.on('text',data=>{
        console.log(data,":用户发送的数据")
        connection.send(data)  // 返回给用户前端用socket.onmessage接收到
    })
    connection.on('colse',colse=>{
        console.log(colse+":用户断开了链接,这个时候会报错,所以服务器还需要处理一个err事件")
    })
    connection.on('error',err=>{
        console.log(err+":报错事件 error")
    })
})

server.listen(PORT,()=>{
    console.log('websocket服务启动成功，监听了端口'+PORT)
})
