import { Document, Types } from "mongoose";

export enum ITaskLogStatus {
  DONE = "done",
  MISSED = "missed",
};

export interface ITaskLog extends Document {
  taskId: Types.ObjectId;
  userId: Types.ObjectId;
  status: ITaskLogStatus;
  date: Date;
}