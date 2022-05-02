const jsonwebtoken = require("jsonwebtoken");
const { Room, User } = require("./../models");
const apiRoom = {
  findAll: async (req, res) => {
    const roomList = await Room.findAll({
      include: {
        model: User,
      },
    });
    res.send(roomList);
  },
  create: async (req, res) => {
    const { name, token } = req.body;
    const decode = jsonwebtoken.verify(token, "webmeet");
    console.log(decode);
    const newRoom = await Room.create({
      name,
      hostId: decode.id,
    });

    res.send({ message: "Create Successfully", data: newRoom });
  },
};
module.exports = apiRoom;
