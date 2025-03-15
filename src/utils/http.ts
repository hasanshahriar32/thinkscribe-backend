import { Response } from 'express';
import { MESSAGES } from '../configs/messages';

interface ResponseData {
  res: Response;
  status: number;
  message: string;
  data: any;
}

interface ThrowErr {
  res: Response;
  error: any;
  status: number;
  message: string;
}

export const responseData = ({
  res,
  status = 200,
  message,
  data,
}: ResponseData) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export class AppError extends Error {
  status: string | number;
  constructor(message: string, status: number | string) {
    super(message);
    this.status = status;
  }
}
