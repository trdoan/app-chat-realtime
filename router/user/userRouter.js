const { Router } = require("express");
const { APIUser } = require("../../controller/userController");

const userRouter = Router();

userRouter.post("/sign-in", APIUser.signIn);
userRouter.post("/sign-up", APIUser.signUp);
module.exports = { userRouter };
