const { Room } = require("./../models");
const apiRoom = {
  findAll: async (req, res) => {
    const roomList = await Room.findAll();
    res.send(roomList);
  },
  create: async (req, res) => {
    const { name, hostId } = req.body;
    const newRoom = await Room.create({
      name,
      hostId,
    });

    res.send({ message: "Create Successfully", data: newRoom });
  },
};
module.exports = apiRoom;
