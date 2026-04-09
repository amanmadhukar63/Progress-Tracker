import { Document, Types } from "mongoose";

export enum ITaskType {
  DAILY = "daily",
  ONETIME = "one-time",
};

export interface ITask extends Document {
  title: String;
  description?: String;
  isActive: boolean;
  type: ITaskType;
  goalId: Types.ObjectId;
}