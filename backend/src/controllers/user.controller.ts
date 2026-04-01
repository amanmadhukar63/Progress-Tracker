import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { signupSchema } from "../helper/validation.js";
import z from "zod";

export async function signup(
  req: Request,
  res: Response
) : Promise<void> {

  try {

    const parsedData = signupSchema.safeParse(req.body);

    if(!parsedData.success) {
      res.status(400).json({
        msg: "Invalid Input",
        error: z.treeifyError(parsedData.error)
      });
      return;
    }

    const { name, email, password } = parsedData.data;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      res.status(409).json({
        msg: "User already exist, Try to login"
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    res.status(201).json({
      msg: "User created successfully",
      data: userResponse
    });
    
  } catch (error) {
    console.error("SignUp Error: ", error);

    res.status(500).json({
      msg: "Server Error",
      err: error
    });
  }
}