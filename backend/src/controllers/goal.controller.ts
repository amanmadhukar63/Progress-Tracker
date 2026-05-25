import { Request, Response } from "express";
import { responseHandler } from "../helper/response.js";
import client from "../helper/db.js";

export async function createGoal(req: Request, res: Response){
  try {
    const { title, description="", status, category="", userId, start_date, end_date } = req.body;

    const query = "INSERT INTO goals (title, description, status, category, start_date, end_date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const createdGoal = await client.query(query, [title, description, status, category, start_date, end_date, userId ]);

    responseHandler(res, {
      message: "Goal created successfully",
      statusCode: 200,
      data: createdGoal?.rows[0]
    });

  } catch (error) {
    console.error("Error while creating goal, ", error);
    responseHandler(res, {
      message: "Server Error",
      statusCode: 500,
      error: JSON.stringify(error)
    })
  }
}

export async function getGoals(req: Request, res: Response) {
  try {
    const { limit = 12, offset = 0 } = req.query;
    
    const query = "SELECT * FROM goals LIMIT $1 OFFSET $2";
    const goals = await client.query(query, [limit, offset]);

    responseHandler(res, {
      message: "Goal fetched successfully",
      statusCode: 200,
      data: goals?.rows
    });
    
  } catch (error) {
    console.error("Error while fetching goals ", error);
    responseHandler(res, {
      message: "Server Error",
      statusCode: 500,
      error
    })
  }
}