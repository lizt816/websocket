let getImg = ''

function init(params) {
  let loginImg = document.querySelector('.login .login-box .login-img')
  for (let i = 0; i < 8; i++) {
   let li = document.createElement('li')
   let img = document.createElement('img')
   img.src = './img/img'+(i+1)+'.jpg'
   li.appendChild(img)
   setLi(li)
   if(i === 0){
    li.classList.add('li-b');
    let img = li.querySelector('img')
    getImg = img.src
   }
   loginImg.appendChild(li)
  }

  let loginButton = document.querySelector('.login-button')
  loginButton.addEventListener('click',function (p) {
   let userName = document.getElementById('userName')
   if(userName.value === '' || userName.value === undefined ){
    maskShow('请输入名称')
    return
   }
   let userInfo = { userName:userName.value,img:getImg }
   let loginBox = document.querySelector('.login')
   let content = document.querySelector('.content')
   loginBox.style.display = 'none'
   content.style.display = 'flex'
   socket.emit('setUserInfo',userInfo)
  })
}
init()


function setLi(li) {
 li.addEventListener('click',function (p) {
   let liList = document.querySelectorAll('li')
   liList.forEach(li => {
     // 移除同级 li 标签的 class
     liList.forEach(item => {
         item.classList.remove('li-b');
     });
  });
  // 添加当前点击的 li 的 class
  let img = this.querySelector('img')
  getImg = img.src
  console.log(getImg,"getImg")
  this.classList.add('li-b');
 })
}




