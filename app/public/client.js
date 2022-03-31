const socket = io();
const renderUserList = (arrUser) => {
  document.getElementById("user-list-by-room").innerHTML = arrUser
    .map((user) => ` <li class="app__item-user">${user.username}</li>`)
    .reduce((sumString, stringHTML) => (sumString += stringHTML), "");
};
// an nut gui tin nhan
document.getElementById("form-messages").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("input-messages").value;
  socket.emit("send-message", message);
});
// nhan thong bao co user moi vao phong
socket.on("notify-new-user-connect", (data) => {
  console.log(data);
});
// gui tin nhan toi tat ca client khac
socket.on("send-client-others", (data) => {
  console.log("server send to me", data);
});
// xin chao user moi vao phong
socket.on("helloFirstTime", (data) => {
  console.log("server send to me", data);
});

const queryString = location.search;
const { room, username } = Qs.parse(queryString, {
  ignoreQueryPrefix: true,
});
// xu ly join phong
socket.emit("join-room", { room, username });

// lay danh sach thanh pphien trong phong
socket.on("get-user-list-by-room", (arrUser) => {
  renderUserList(arrUser);
});
socket.on("one-user-out", (arrUser) => {
  renderUserList(arrUser);
});
