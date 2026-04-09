import { Schema, model } from "mongoose";
import { ITask, ITaskType } from "../types/task.js";

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  type: {
    type: String,
    enum: ITaskType,
    default: ITaskType.DAILY,
  },
  goalId: {
    type: Schema.Types.ObjectId,
    ref: "Goal",
    required: true,
  }
},
{ timestamps: true });

export default model<ITask>("Task", taskSchema);