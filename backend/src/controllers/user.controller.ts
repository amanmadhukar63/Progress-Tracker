import { Request, Response } from "express";
import User from "../models/user.model.js";

export async function signup(
  req: Request,
  res: Response
) : Promise<void> {

  try {

    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      res.status(400).json({
        msg: "Required fields are missing",
        data: {
          name,
          email,
          password
        }
      });
      return;
    }

    let user;

    user = await User.find({
      email
    });

    if(user) {
      res.status(400).json({
        msg: "User already exist, Try to login"
      });
      return;
    }

    user = await User.create({
      name,
      email,
      password
    });

    res.status(200).json({
      msg: "User created successfully",
      data: user
    });
    
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      err: error
    });
  }
}