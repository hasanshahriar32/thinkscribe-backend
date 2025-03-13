import { Response } from 'express';
import { ExpressError } from '../types';

interface ResponseData {
  res: Response;
  status: number;
  message: string;
  data: any;
}

interface ThrowErr {
  res: Response;
  error: ExpressError;
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

export const throwErr = ({ res, error, status = 500, message }: ThrowErr) => {
  console.log(error);

  res.status(status).json({
    status,
    message,
  });
};
