const socket = io('http://localhost:5050');

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".msg-input");
  const sendButton = document.querySelector(".send");
  const msgList = document.querySelector(".msg-list");
  const senderName = document.querySelector(".user");
  const receiverName = document.querySelector(".receiver");

  let savedUsername = localStorage.getItem('username');

  // Устанавливаем начальное имя получателя
  receiverName.textContent = savedUsername || "Receiver";

  if (savedUsername) {
    senderName.textContent = savedUsername;
    socket.emit('setUsername', savedUsername);
  }

  sendButton.addEventListener("click", function () {
    const message = inputField.value.trim();
    if (message !== "") {
      sendMessage(message);
      inputField.value = "";
    }
  });

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendButton.click();
    }
  });

  function sendMessage(message) {
    socket.emit('message', message);
  }

  socket.on('message', (data) => {
    const li = document.createElement("li");
    li.classList.add("chat-list");
    li.textContent = `${data.sender}: ${data.message}`;
    msgList.appendChild(li);

    // if (!savedUsername) {
    //   receiverName.textContent = "Receiver";
    // }
  });

  socket.on('setUsername', (username) => {
    socket.username = username;
    savedUsername = username;
    localStorage.setItem('username', savedUsername);
    senderName.textContent = savedUsername;

    // Обновляем имя получателя только при установке нового имени
    if (!receiverName.textContent) {
      receiverName.textContent = savedUsername;
    }
  });

  // Update receiver name only once when connected
  // socket.on('connect', () => {
  //   if (!receiverName.textContent) {
  //     receiverName.textContent = savedUsername || "Receiver";
  //   }
  // });
});
