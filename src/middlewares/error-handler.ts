import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/http';
import { MESSAGES } from '../configs/messages';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log error stack for debugging

  res.status(+err.status || 500).json({
    status: err.status,
    message: err.message || MESSAGES.ERROR.SERVER,
  });
};
