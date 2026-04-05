import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { loginSchema, signupSchema } from "../helper/validation.js";
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

  try {
    const parsedData = loginSchema.safeParse(req.body);

    if(!parsedData.success){
      responseHandler(res, {
        message: "Invalid Input",
        statusCode: 400,
        error: z.treeifyError(parsedData.error)
      });
      return;
    }

    const {email, password} = parsedData.data;

    const user = await User.findOne({ email });

    if(!user){
      responseHandler(res, {
        message: "User does not exist, Pls signup",
        statusCode: 400,
        error: "User not registered"
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
      responseHandler(res, {
        message: "Incorrect password, Try again",
        statusCode: 400,
        error: "Wrong password"
      });
      return;
    }

    responseHandler(res, {
      message: "Login successful",
      statusCode: 201,
      data: user
    });

  } catch (error) {
    console.error("Error while login", error);
    responseHandler(res, {
      message: "Error occured while login",
      statusCode: 500,
      error
    });
  }

}

export function logout(
  req: Request,
  res: Response
) : void {
  try {
    responseHandler(res, {
      message: "Logout Successfully",
      statusCode: 201,
      data: {}
    });
  } catch (error) {
    console.error("Error while logout", error);
  }
}