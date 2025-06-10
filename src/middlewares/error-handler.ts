import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/http';
import { MESSAGES } from '../configs/messages';
import sendResponse from '../utils/sendResponse';

// Custom global error-handling middleware for Express
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Print the full error stack trace to the console for debugging
  console.error(err.stack);

  // Use sendResponse util for all errors (AppError or not)
  sendResponse(res, {
    statusCode: +err.status || 500,
    success: false,
    message: err.message || MESSAGES.ERROR.SERVER,
    data: null,
  });
};
