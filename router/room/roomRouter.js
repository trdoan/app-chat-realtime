const { Router } = require("express");
const apiRoom = require("../../controller/roomController");

const roomRouter = Router();

roomRouter.get("/", apiRoom.findAll);
roomRouter.post("/", apiRoom.create);
module.exports = roomRouter;
