const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const APIUser = {
  signUp: async (req, res) => {
    const { email, password, displayName } = req.body;
    //tao chuoi ngau nhien
    const salt = await bcryptjs.genSaltSync(10);
    //ma hoa mat khau
    const hashPasswd = await bcryptjs.hashSync(password, salt);

    const existEmail = await User.findOne({ where: { email } });
    console.log(existEmail);
    if (existEmail !== null) {
      res
        .status(400)
        .send({ message: "Email này đã tồn tại", status: "EXIST_EMAIL" });
    } else {
      const newUser = await User.create({
        email,
        password: hashPasswd,
        displayName,
      });
      res
        .status(200)
        .send({ message: "Đăng ký thành công", status: "SUCCESS" });
    }
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const accountUser = await User.findOne({ where: { email } });
      if (accountUser) {
        const isPassword = bcryptjs.compareSync(password, accountUser.password);
        if (isPassword) {
          //tao token
          const payload = {
            id: accountUser.id,
            displayName: accountUser.displayName,
            email: accountUser.email,
          };
          const secretKey = "webmeet";
          const token = jwt.sign(payload, secretKey, {
            expiresIn: 24 * 60 * 60,
          });
          res.send({
            message: "Đăng nhập thành công",
            token,
            status: "OK",
          });
        } else {
          res.status(400).send({ message: "Sai mật khẩu", status: "PW_ERROR" });
        }
      } else {
        res.status(404).send({
          message: "Không tìm thấy tài khoản này",
          status: "EXIST_ACC",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  profileUser: async (req, res) => {
    try {
      const { id } = req.user;
      let profile = await User.findByPk(id);
      res.status(200).send(profile);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  profileUserUpdate: async (req, res) => {
    try {
      const { id } = req.user;
      const { displayName } = req.body;
      await User.update({ displayName }, { where: { id } });
      res.status(200).send({ message: "Update complete" });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
module.exports = {
  APIUser,
};
