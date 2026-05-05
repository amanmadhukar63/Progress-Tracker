// import { Schema, model } from "mongoose";
// import { IUser } from "../types/user.js";

// const userSchema = new Schema<IUser>({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   emailVerified: {
//     type: Boolean,
//     default: false
//   },
//   otp: {
//     type: String,
//     default: ""
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   refreshToken: {
//     type: String,
//     required: true
//   }
// },
// { timestamps: true });

// userSchema.index({ email: 1 });

// export default model<IUser>("User", userSchema);