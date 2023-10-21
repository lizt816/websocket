 let socket = io('http://127.0.0.1:80')
 let messageList = document.querySelector('.message-list')
 let myInfoImg = document.createElement('img')
 let divMessage = document.createElement('div')
 let emoji = []
 socket.on('getUserInfo',(data)=>{
  maskShow(data.message)
  // 显示左上角图片
  let myInfo = document.querySelector('.user > .my-info')

  myInfoImg.src = data.data.img
  divMessage.innerText = data.data.userName

  myInfo.appendChild(myInfoImg)
  myInfo.appendChild(divMessage)
 })

 socket.on('addUser',(data)=>{
  // 发送消息告诉聊天室有人进来了,发送群消息
  let divUser = document.createElement('div')
  divUser.classList.add('time');
  divUser.innerText = data.data.time + ': ' +  data.data.userName+'加入聊天室'
  messageList.appendChild(divUser)
  nodeScrollIntoView()
})
socket.on('delUser',(data)=>{
 let divUser = document.createElement('div')
  divUser.classList.add('time');
  divUser.innerText = data.data.time + ': ' +  data.data.userName+'离开了聊天室'
  maskShow(data.data.userName+'离开了聊天室')
  messageList.appendChild(divUser)
  nodeScrollIntoView()
})

socket.on('userInfoList',(data)=>{
 let userList = document.querySelector('.user-list')
 userList.innerHTML = ''
 let span = document.querySelector('.chat-hade span')
 span.innerText = data.data.length
 data.data.forEach(e => {
  let divList = document.createElement('div')
  divList.classList.add('my-info');
  let textList = document.createElement('div')
  let imgList = document.createElement('img')
  imgList.src = e.img
  textList.innerText = e.userName
  divList.appendChild(imgList)
  divList.appendChild(textList)
  userList.appendChild(divList)
 });
})

function sendMessage() {
  // 发送消息
  let value = document.getElementById('textarea')
  value = value.value
  if(!value){
   maskShow('请输入内容')
   return
  }
  let data = {
   img:myInfoImg.src,
   message:value,
   userName:divMessage.innerText
  }
  socket.emit('userSendMessage',data)
}



socket.on('messageImg',data=>{
  let div1 = document.createElement('div')
  let div2 = document.createElement('div')
  let img = document.createElement('img')
  let img2 = document.createElement('img')
  img2.style.maxWidth = '200px'
  img2.style.width = 'auto'
  img2.style.height = 'auto'
  img2.style.margin = '5px'
  img2.classList = 'list-last-img'
  img.src = data.data.img
  img2.src = data.data.message
 if(data.data.userName === divMessage.innerText){
  // 自己
  div1.classList = 'user-r flex-r'
  div2.classList = 'message message-r'
  
  div2.appendChild(img2)
  div1.appendChild(div2)
  div1.appendChild(img)
 } else{
  // 别人
  div1.classList = 'user-r flex-l'
  div2.classList = 'message message-l'
  div2.appendChild(img2)

  div1.appendChild(img)
  div1.appendChild(div2)
 }
 messageList.appendChild(div1)
 img2.onload = function(e){
  nodeScrollIntoView()
 }
})

socket.on('userSendMessage',data=>{
  let div1 = document.createElement('div')
  let div2 = document.createElement('div')
  let img = document.createElement('img')
  img.src = data.data.img
  div2.innerText = data.data.message
 if(data.data.userName === divMessage.innerText){
  // 自己
  div1.classList = 'user-r flex-r'
  div2.classList = 'message message-r'

  div1.appendChild(div2)
  div1.appendChild(img)
 } else{
  // 别人
  div1.classList = 'user-r flex-l'
  div2.classList = 'message message-l'

  div1.appendChild(img)
  div1.appendChild(div2)
 }
 messageList.appendChild(div1)
 let value = document.getElementById('textarea')
  value.value = ''
 nodeScrollIntoView()
})

function nodeScrollIntoView() {
  let childNodes = messageList.lastElementChild
  childNodes.scrollIntoView(false)
}

function fileclick(params) {
 let flie = document.getElementById('file')
 flie.click()
}
function changeFile(event){
   let file = event.target.files[0]
   let fr = new FileReader()
   fr.readAsDataURL(file)
   let data = {
    img:myInfoImg.src,
    message:'',
    userName:divMessage.innerText
   }
   fr.onload = function (params) {
     data.message = fr.result
     socket.emit('messageImg',data)
   }
}


 function maskShow(message){
  let mask = document.createElement('div')
  let body = document.body;
  mask.innerHTML = message
  body.appendChild(mask);
  mask.classList.add('mask');
  mask.style.animation = 'mask 6s linear'
  setTimeout(() => {
   mask.remove();
  }, 6000);
 }

 function clickEmoji() {
  let emoji = document.querySelector('.emoji')
  let biaos = document.querySelector('.biaos')
  if(!emoji || !biaos)return
  emoji.style.display = 'flex'
  biaos.style.display = 'flex'
 }

 function mouseleaveEmoji() {
  let emoji = document.querySelector('.emoji')
  let biaos = document.querySelector('.biaos')
  if(!emoji || !biaos)return
  emoji.style.display = 'none'
  biaos.style.display = 'none'
 }
 

 let xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', './js/emoji.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      emoji = JSON.parse(xhr.responseText);
      let emojiList = document.querySelector('.emoji-box')
      emoji.forEach(e=>{
       let span = document.createElement('span')
       span.innerHTML = e.emoji
       span.onclick = function(e){
        let value = document.getElementById('textarea')
        value.value += this.innerText

       }
       emojiList.appendChild(span)
      })
    }
  };
  xhr.send(null);