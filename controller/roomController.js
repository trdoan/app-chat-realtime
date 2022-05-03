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
  findDetail: async (req, res) => {
    const { id } = req.params;
    try {
      let infoRoom = await Room.findByPk(id);
      if (infoRoom) {
        res.status(200).send(infoRoom);
      } else {
        res.status(401).send({ message: "Phòng không tồn tại" });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  },
  create: async (req, res) => {
    const { name, password, type } = req.body;
    const { token } = req.headers;
    const decode = jsonwebtoken.verify(token, "webmeet");
    const newRoom = await Room.create({
      name,
      hostId: decode.id,
      password,
      type,
    });

    res.send({ message: "Create Successfully", data: newRoom });
  },
  update: async (req, res) => {
    const { name, token, password, type } = req.body;
    try {
      const decode = jsonwebtoken.verify(token, "webmeet");
      await Room.update(
        {
          name,
          password,
          type,
        },
        { where: { hostId: decode.id } },
      );
      res.status(200).send({ message: "Update complete", status: "SUCCESS" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  },
  delete: async (req, res) => {
    const { token } = req.headers;
    const { id } = req.params;
    try {
      const decode = jsonwebtoken.verify(token, "webmeet");
      let kq = await Room.destroy({ where: { id, hostId: decode.id } });
      if (kq === 1) {
        res.status(200).send({ message: "Delete complete" });
      } else {
        res.status(403).send({ message: "Không có quyền xóa" });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  },
};
module.exports = apiRoom;
