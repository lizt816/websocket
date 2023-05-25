const ws = require('nodejs-websocket')


let count = 0;       // 代表加入人数的数量
//  第一个参数conn代表每个用户进来的时候，都会有一个conn
const server = ws.createServer(conn=>{
    console.log('有用户链接 触发一次 count++')
    // 限制人数
    count++   // 有人加入 
    conn.userName = `用户${count}`  // 创建一个userName 给他取名叫 用户 count：数量  
    // 1. 这个时候需要 告诉所有人 有人进来了 
    broadcast({
        type:0,
        masg:`${conn.userName}进入了聊天室`,

    })

    conn.on('text',(data)=>{
        console.log(data,'接收的消息')
        // 接收到的消息 
        // 2. 当我们接收到某个用户的信息的时候，告诉所有人，这消息的内容是什么
        broadcast(data)
        // conn.send(data)    //  --- 这之只能给指定的用户发生消息  需要给所有用户发消息 ，需要使用 
        // yarn add nodejs-websocket这个依赖包的函数 
    })
    conn.on('close',(data)=>{
        console.log('关闭链接--'+data)
        count--   // 有人离开
        broadcast(`${conn.userName}离开了聊天室`)
        // 告诉所有人，有人离开了
    })
    conn.on('error',(data)=>{
        console.log('发生了异常--'+data)
    })
})

// broadcast  广播 
function broadcast(msg) {
    // server.connections 代表所有的用户
    server.connections.forEach(item=>{
        let data = JSON.stringify(msg)
        item.send(msg.masg)
    })
}

server.listen(3000,()=>{
    console.log('监听端口3000')
})