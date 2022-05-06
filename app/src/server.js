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
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("SP9TV1670g", "SP9TV1670g", "bYYr6kVWnN", {
  host: "remotemysql.com",
  dialect: "mysql",
});
const io = new Server(httpServer, {
  cors: "*",
});
//
io.on("connection", async (socket) => {
  let time = new Date().toISOString().split("T")[0];

  try {
    // const [results, metadata] = await sequelize.query(
    //   `INSERT INTO Rooms (name,hostId,createdAt,updatedAt) VALUES ("1",1,"${time}","${time}");`
    // );
    // console.log(results);
  } catch (error) {
    console.log(error);
  }

  console.log("a new socket connected" + socket.id);
  socket.emit("helloID", socket.id);
  // có 1 phòng vừa được tạo trên server
  socket.on("new-room-created", (data) => {
    // gửi tb tới client khác cập nhật FE
    io.emit("send-rooms-to-client");
  });
  socket.on("new-room-deleted", () => {
    // gửi tb tới client khác cập nhật FE
    io.emit("send-rooms-to-client");
  });
  let roomID;
  // sự kiện user tham gia phòng
  socket.on("join-room", (data) => {
    const { displayName, room, id } = data;

    // xu ly vao phong
    socket.join(room);
    const newUser = {
      id: socket.id,
      displayName,
      room,
    };
    console.log(newUser);
    addUser(newUser);
    const arrUser = getListUsersByRoom(room);

    // lay danh sach thanh vien dang o trong phong
    io.to(room).emit("get-user-list-by-room", arrUser);

    // xin chao user moi khi vao room
    socket.emit("helloFirstTime", {
      displayName: "Hệ thống",
      message: `Chào mừng ${displayName} đã vào phòng chat `,
    });
    socket.emit("getID", socket.id);
    // gui ttin nhan
    socket.on("send-message", (data) => {
      console.log({ id: socket.id, data: data });
      io.to(room).emit("send-client-others", data);
    });
    socket.on("one-user-leaving-room", () => {
      removeUser(socket.id);
      const arrUser = getListUsersByRoom(roomID);
      io.to(roomID).emit("one-user-out", {
        message: `${displayName} vừa rời khỏi phòng chat`,
        data: arrUser,
      });
    });
    // thong bao co 1 user vao phong cho cac user khac ttrong room
    socket.broadcast.to(room).emit("notify-new-user-connect", {
      displayName: "Hệ thống",
      message: `${displayName}  vừa vào phòng chat`,
    });

    // ngat ket noi
    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
      removeUser(socket.id);
      const arrUser = getListUsersByRoom(roomID);
      io.to(roomID).emit("one-user-out", {
        message: `${displayName} vừa rời khỏi phòng chat`,
        data: arrUser,
      });
    });
  });
});

httpServer.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = io;
