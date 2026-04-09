import { Schema, model } from "mongoose";
import { IGoal, IGoalStatus } from "../types/goal.js";

const goalSchema = new Schema<IGoal>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: IGoalStatus,
    default: IGoalStatus.ACTIVE
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }},
  { timestamps: true }
);

goalSchema.index({ userId: 1, createdAt: -1 });

export default model<IGoal>("Goal", goalSchema);