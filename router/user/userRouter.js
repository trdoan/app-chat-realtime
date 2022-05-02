const { Router } = require("express");
const { APIUser } = require("../../controller/userController");
const { authenticate } = require("../../middlewares/auth/verify-token.auth");

const userRouter = Router();
//auth
userRouter.post("/sign-in", APIUser.signIn);
userRouter.post("/sign-up", APIUser.signUp);
userRouter.post("/checkToken", APIUser.checkToken);

//user
userRouter.get("/profile", authenticate, APIUser.profileUser);
userRouter.put("/profileUpdate", authenticate, APIUser.profileUserUpdate);
module.exports = { userRouter };
