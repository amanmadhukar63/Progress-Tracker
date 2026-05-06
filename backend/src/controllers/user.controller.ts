import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import client from "../helper/db.js";
import { loginSchema, signupSchema } from "../helper/validation.js";
import z from "zod";
import { responseHandler } from "../helper/response.js";
import { IUser } from "../types/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

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

    const existingQuery = "SELECT * FROM users WHERE email=$1";
    const existingUser = await client.query(existingQuery, [email]);

    if(existingUser?.rowCount && existingUser.rowCount > 0) {
      responseHandler(res, {
        message: "User already exist, Try to login",
        statusCode: 409,
        error: "User exist with this email id"
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const refreshToken = await jwt.sign({
      name,
      email
    }, JWT_SECRET, { expiresIn: "15d"});

    const newUserQuery = "INSERT INTO users (name, email, password, refresh_token) VALUES ($1, $2, $3, $4) RETURNING *;"
    const newUser = await client.query(newUserQuery, [name, email, hashedPassword, refreshToken]);

    const token = await jwt.sign({
      id: newUser.rows[0].id,
      name,
      email
    }, JWT_SECRET, { expiresIn: "1h"});

    const userResponse = {
      id: newUser.rows[0].id,
      name: newUser.rows[0].name,
      email: newUser.rows[0].email,
      token,
      refreshToken
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

    const existingQuery = "SELECT * FROM users WHERE email=$1";
    const existingUser = await client.query(existingQuery, [email]);
    const userExist = existingUser?.rowCount && existingUser.rowCount>0 ? true : false;

    if(!userExist){
      responseHandler(res, {
        message: "User does not exist, Pls signup",
        statusCode: 400,
        error: "User not registered"
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.rows[0].password);

    if(!isPasswordCorrect){
      responseHandler(res, {
        message: "Incorrect password, Try again",
        statusCode: 400,
        error: "Wrong password"
      });
      return;
    }

    const token = await jwt.sign({
      id: existingUser.rows[0].id,
      name: existingUser.rows[0].name,
      email: existingUser.rows[0].email,
    }, JWT_SECRET, { expiresIn: "1h"});

    const userResponse = {
      id: existingUser.rows[0].id,
      name: existingUser.rows[0].name,
      email: existingUser.rows[0].email,
      token,
      refreshToken: existingUser.rows[0].refreshToken,
    };

    responseHandler(res, {
      message: "Login successful",
      statusCode: 201,
      data: userResponse,
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