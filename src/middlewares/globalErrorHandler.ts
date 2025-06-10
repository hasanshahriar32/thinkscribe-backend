import { Request, Response, NextFunction } from 'express';
import ApiErrors from '../errorsHandler/ApiErrors';

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  let status = 500;
  let message = 'something is not right';
  let errorMessages: { path: string; message: string }[] = [];

  if (error instanceof ApiErrors) {
    status = error.status;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: req.originalUrl,
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: req.originalUrl,
            message: error.message,
          },
        ]
      : [];
  }

  res.status(status).json({
    success: false,
    statusCode: status,
    message,
    errorMessages,
  });
};

export default globalErrorHandler;