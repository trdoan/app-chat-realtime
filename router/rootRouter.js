const { Router } = require("express");
const roomRouter = require("./room/roomRouter");
const { userRouter } = require("./user/userRouter");

const rootRouter = Router();

rootRouter.use("/auth", userRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/room", roomRouter);
module.exports = { rootRouter };
