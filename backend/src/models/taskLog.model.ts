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
    set: (val: Date) => {
      const d = new Date(val);
      d.setHours(0, 0, 0, 0);
      return d;
    },
  },
  status: {
    type: String,
    enum: ITaskLogStatus,
    required: true,
  }
},
{ timestamps: true });

taskLogSchema.index({
  userId: 1,
  taskId: 1,
  date: -1,
},
{ unique: true });

export default model<ITaskLog>("TaskLog", taskLogSchema);