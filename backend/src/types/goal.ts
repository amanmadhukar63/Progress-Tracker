import { Types } from "mongoose";

export enum IGoalStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
}

export interface IGoal extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: IGoalStatus;
  userId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}