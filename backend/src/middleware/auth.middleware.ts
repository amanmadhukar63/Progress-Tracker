import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../helper/response.js";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user.js";
import User from "../models/user.model.js";

interface JwtPayload {
  name: String;
  email: String;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token" });
      responseHandler(res, {
        message: "Token is missing",
        statusCode: 400,
        error: "TOKEN_MISSING"
      })
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    let user: IUser | null = await User.findOne({
      email: decoded.email,
    });

    if(!user) {
      responseHandler(res, {
        message: "User not found",
        statusCode: 400,
        error: "USER_NOT_FOUND"
      });
      return;
    }

    req.user = user;

    next();

  } catch (err) {
    console.error("Middleware error ", err);
    responseHandler(res, {
      message: "Invalid Token",
      statusCode: 401,
      error: "INVALID_TOKEN"
    });
  }
}