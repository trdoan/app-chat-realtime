const { Router } = require("express");
const { APIUser } = require("../../controller/userController");

const userRouter = Router();

userRouter.post("/signin", APIUser.signIn);
userRouter.post("/signup", APIUser.signUp);
module.exports = { userRouter };
