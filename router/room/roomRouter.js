const { Router } = require("express");
const apiRoom = require("../../controller/roomController");

const roomRouter = Router();

roomRouter.get("/", apiRoom.findAll);
roomRouter.post("/", apiRoom.create);
roomRouter.put("/update", apiRoom.update);
roomRouter.delete("/delete/:id", apiRoom.delete);
module.exports = roomRouter;
