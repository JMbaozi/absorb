// 初始化
var APP_ID = 'bE5uulX1rjlMYfvX3bkYxRcp-gzGzoHsz';
var APP_KEY = 'UyMjj3WbzaiLcFB13sICVpnW';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


var query = new AV.Query('Message');
query.find()
    .then(
        function(messages) {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
                let p = document.createElement('p')
                p.innerText =`${item.name}：${item.content}        ${item.time}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(p)
            })
        }
    )

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let content = myForm.querySelector('textarea[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    let email = myForm.querySelector('input[name=email]').value
    let site = myForm.querySelector('input[name=site]').value
    var myDate = new Date();
    var time = myDate.toLocaleString( );
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'name':name,
        'email':email,
        'time':time,
        'site':site,
        'content':content
    }).then(function(object) { //obiect为存入的数据的相关信息
        let p = document.createElement('p')
        p.innerText =`${object.attributes.name}：${object.attributes.content}        ${object.attributes.time}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(p)
        myForm.querySelector('textarea[name=content]').value=''
    })
})
