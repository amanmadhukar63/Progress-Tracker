import { Router } from "express";
import { signup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/create", signup);

export default userRouter;