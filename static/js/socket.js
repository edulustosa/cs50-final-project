// Establish connection to the server
const socket = io();

const btnSend = document.querySelector(".btn-send-message");
const chatMessages = document.querySelector(".chat-messages");

// Make sure the scroll is automatically at the bottom of the chat when users open the page
chatMessages.scrollTop = chatMessages.scrollHeight;

btnSend.addEventListener("click", () => {
  // Send the message to the server
  let message = document.querySelector("#message-input").value;
  if (message) {
    socket.emit("new_message", message);
    document.querySelector("#message-input").value = "";
  }
});

socket.on("chat", (data) => {
  // Takes the messages that were sent to the server and puts them in the chat

  // Handle messages if they were send by the current user or not 
  if (data["user"] === username) {
    sendMessages(data);
  } else {
    receivedMessages(data);
  }
});

function sendMessages(data) {
  const ul = document.querySelector(".messages");
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
  const div = document.createElement("div");
  div.classList.add("ms-2", "me-auto", "send");
  const divUser = document.createElement("div");
  divUser.classList.add("fw-bold");
  divUser.innerText = "You";
  const message = document.createElement("p");
  message.innerText = data["message"];

  div.appendChild(divUser);
  div.appendChild(message);
  li.appendChild(div);
  ul.appendChild(li);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function receivedMessages(data) {
  const ul = document.querySelector(".messages");
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-end", "align-items-start");
  const div = document.createElement("div");
  div.classList.add("ms-2", "text-end", "received");
  const divUser = document.createElement("div");
  divUser.classList.add("fw-bold");
  divUser.innerText = data["user"];
  const message = document.createElement("p");
  message.innerText = data["message"];

  div.appendChild(divUser);
  div.appendChild(message);
  li.appendChild(div);
  ul.appendChild(li);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}
