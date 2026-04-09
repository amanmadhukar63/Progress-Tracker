import { Schema, model } from "mongoose";
import { ITaskLog, ITaskLogStatus } from "../types/taskLog.js";

const taskLogSchema = new Schema<ITaskLog>({
  taskId: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ITaskLogStatus,
    required: true,
  }
},
{ timestamps: true });

export default model<ITaskLog>("TaskLog", taskLogSchema);