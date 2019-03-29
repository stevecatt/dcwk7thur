let chatMessageTextBox = document.getElementById("chatMessageTextBox")

let sendMessageButton = document.getElementById("sendMessageButton")

let chatMessageList = document.getElementById("chatMessageList")

sendMessageButton.addEventListener('click',function(){
  // send a message to the server
  let message = chatMessageTextBox.value
  socket.emit('houston',message)

})

var socket = io();

socket.on('houston',(data) => {
  console.log(data)

  let chatMessageLI = `<li>${data}</li>`
  chatMessageList.insertAdjacentHTML('beforeend',chatMessageLI)

})
