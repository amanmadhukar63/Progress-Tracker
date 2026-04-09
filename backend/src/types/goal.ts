import { Types } from "mongoose";

export enum IGoalStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
}

export interface IGoal extends Document {
  title: string;
  description: string;
  status: IGoalStatus;
  userId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}