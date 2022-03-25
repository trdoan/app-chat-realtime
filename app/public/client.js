const socket = io();
document.getElementById("form-mess").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("input-message").value;
  socket.emit("send-message", message);
});
socket.on("notify-new-user-connect", (data) => {
  console.log(data);
});
socket.on("send-client-others", (data) => {
  console.log("server send to me", data);
});
socket.on("helloFirstTime", (data) => {
  console.log("server send to me", data);
});
