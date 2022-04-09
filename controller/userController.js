const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const APIUser = {
  signUp: async (req, res) => {
    const { email, password, userName } = req.body;
    //tao chuoi ngau nhien
    const salt = await bcryptjs.genSaltSync(10);
    //ma hoa mat khau
    const hashPasswd = await bcryptjs.hashSync(password, salt);

    const existEmail = await User.findOne({ where: { email } });
    console.log(existEmail);
    if (existEmail !== null) {
      res.send({ message: "Email này đã tồn tại" });
    } else {
      const newUser = await User.create({
        email,
        password: hashPasswd,
        userName,
      });
      res.send(newUser);
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
            name: accountUser.userName,
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
          res.send({ message: "Sai mật khẩu", status: "PW ERROR" });
        }
      } else {
        res.send({
          message: "Không tìm thấy tài khoản này",
          status: "TK ERROR",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getInfo: async (req, res) => {
    try {
      const { id } = req.user;
      let infoUser = await User.findByPk(id);
      res.send(infoUser);
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = {
  APIUser,
};
