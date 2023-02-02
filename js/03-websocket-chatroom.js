    import localConfig from './localConfig.js'
    var input = document.querySelector('input')
    var button = document.querySelector('button')
    var div = document.querySelector('div')
    // webSocket使用
    // 首先创建webSocket对象
    var socket = new WebSocket('ws://'+localConfig.wsIp+':3000')
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
        div.innerHTML = params.data
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