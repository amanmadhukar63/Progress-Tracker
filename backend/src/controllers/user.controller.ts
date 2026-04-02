import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { signupSchema } from "../helper/validation.js";
import z from "zod";
import { responseHandler } from "../helper/response.js";

export async function signup(
  req: Request,
  res: Response
) : Promise<void> {

  try {

    const parsedData = signupSchema.safeParse(req.body);

    if(!parsedData.success) {
      responseHandler(res, {
        message: "Invalid Input",
        statusCode: 400,
        error: z.treeifyError(parsedData.error)
      });
      return;
    }

    const { name, email, password } = parsedData.data;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      responseHandler(res, {
        message: "User already exist, Try to login",
        statusCode: 409,
        error: "User exist with this email id"
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

    responseHandler(res, {
      message: "User created successfully",
      statusCode: 201,
      data: userResponse
    });
    
  } catch (error) {
    console.error("SignUp Error: ", error);

    responseHandler(res, {
      message: "Server Error",
      statusCode: 500,
      error
    });
  }
}

export async function login(
  req: Request,
  res: Response
): Promise<void> {

}