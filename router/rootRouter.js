const { Router } = require("express");
const { userRouter } = require("./user/userRouter");

const rootRouter = Router();

rootRouter.use("/auth", userRouter);
module.exports = { rootRouter };
