import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

export async function connectDB(){
  try {

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

  } catch (error) {

    console.error("❌ MongoDB error:", error);
    process.exit(1);
  }
}