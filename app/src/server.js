const express = require("express");
const path = require("path");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const pathPublicDirectory = path.join(__dirname, "../public");
app.use(express.static(pathPublicDirectory));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  // options
});
io.on("connection", (socket) => {
  socket.emit("helloFirstTime", "Welcome to Hack FB APP");
  socket.on("send-message", (data) => {
    console.log({ id: socket.id, data: data });
    io.emit("send-client-others", data);
  });
  socket.broadcast.emit("notify-new-user-connect", "One user has connected");
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
httpServer.listen(5000, () => {
  console.log(`App is running on port 5000`);
});
