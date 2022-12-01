// 服务器代码

let PORT = 3000
// 导入nodejs-websocket包
const ws = require('nodejs-websocket')
// 创建一个服务
const server = ws.createServer((connection)=> {
    console.log('new connection 创建一个链接，有用户链接了')
    connection.on('text',(data=>{
        console.log(data,"///")
        connection.send(data)
    }))
})

server.listen(PORT,()=>{
    console.log('websocket服务启动成功，监听了端口'+PORT)
})
