import { Router } from "express";
import { createGoal, getGoals } from "../controllers/goal.controller.js";

const goalRouter = Router();

goalRouter.post("/create", createGoal);

goalRouter.get("/get", getGoals);

export default goalRouter;