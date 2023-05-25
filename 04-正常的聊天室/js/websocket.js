    // import localConfig from './localConfig.js'
    var input = document.querySelector('input')
    var button = document.querySelector('button')
    var div = document.querySelector('div')

    let TYPE_ENTER = 0;    // 0 进入消息
    let TYPE_LEAVE = 1;    //1离开消息
    let TYPE_MSG = 2;    //2 正常消息
    // webSocket使用
    // 首先创建webSocket对象
    var socket = new WebSocket('ws://192.168.0.107:3000')
    socket.onerror = function (err){
        console.log(err)
        console.log('链接失败了')
        div.innerHTML = err+'链接失败了'
    };
    socket.onopen = function (params) {
        console.log(params,'链接服务成功了')
        div.innerHTML = params+'链接服务成功了'
    }
    socket.onmessage = function (params) {
        console.log(params,"接受数据"+params.data+"//////")
        let data = JSON.parse(params.data)
        let dv = document.createElement('div')
        let span = document.createElement('span')
        span.innerHTML = '-----'+data.time
        dv.innerHTML = data.message
        if(data.type === TYPE_ENTER){
         dv.style.color = 'green'
        } else if(data.type === TYPE_LEAVE) {
         dv.style.color = 'red'
        } else{
         dv.style.color = 'blue'
        }
        div.appendChild(dv)
        span.style.color = 'pink'
        dv.appendChild(span)

    }
    socket.onclose = function () {
        div.innerHTML = '服务断开了!不是前端点击断开,而是服务器断开,前端要做什么处理的事件'
    }
    window.wsSend = function () {
        let value = input.value
        if(!value)return;
        console.log(value,"发送的数据")
        socket.send(value)
    }