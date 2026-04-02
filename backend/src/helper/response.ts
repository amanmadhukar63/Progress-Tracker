import { Response } from "express";

type ResponseOptions = {
  message: string;
  data?: any;
  error?: any;
  statusCode?: number;
};

export const responseHandler = (
  res: Response,
  { message, data = null, error = null, statusCode = 200 }: ResponseOptions
) => {

  if(error) {
    return res.status(statusCode).json({
      success: false,
      message,
      error
    });
  }
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};