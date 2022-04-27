const express = require("express");
const path = require("path");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const { getListUsersByRoom, addUser, removeUser } = require("./model/user");
const { rootRouter } = require("../../router/rootRouter");
const cors = require("cors");
const pathPublicDirectory = path.join(__dirname, "../public");
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.static(pathPublicDirectory));
app.use(express.json());
app.use("/", rootRouter);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: "*",
});
// co 1 ket noi moi
io.on("connection", (socket) => {
  socket.emit("helloID", socket.id);
  console.log(socket.id);
  let roomID;
  socket.on("join-room", (data) => {
    const { username, room, id } = data;
    roomID = room;
    // xu ly vao phong
    socket.join(room);
    const newUser = {
      id: socket.id,
      username,
      room,
    };
    console.log(newUser);
    addUser(newUser);
    const arrUser = getListUsersByRoom(room);

    // lay danh sach thanh vien dang o trong phong
    io.to(room).emit("get-user-list-by-room", arrUser);

    // xin chao user moi khi vao room
    socket.emit("helloFirstTime", {
      username: "Hệ thống",
      message: `Chào mừng ${username} đã vào phòng chat ${room}`,
    });
    socket.emit('getID', socket.id);
    // gui ttin nhan
    socket.on("send-message", (data) => {
      console.log({ id: socket.id, data: data });
      io.to(room).emit("send-client-others", data);
    });

    // thong bao co 1 user vao phong cho cac user khac ttrong room
    socket.broadcast.to(room).emit("notify-new-user-connect", {
      username: "Hệ thống",
      message: `${username}  vừa vào phòng chat`,
    });
    // ngat ket noi
    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
      removeUser(socket.id);
      const arrUser = getListUsersByRoom(roomID);
      io.to(roomID).emit("one-user-out", {
        message: `${username} vừa rời khỏi phòng chat`,
        data: arrUser,
      });
    });
  });
});

httpServer.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
