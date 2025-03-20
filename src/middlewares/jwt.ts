import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { MESSAGES } from '../configs/messages';
import { AppError } from '../utils/http';
dotenv.config();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'smsk-jwt-secret',
    (
      err: jwt.VerifyErrors | null,
      decoded: jwt.JwtPayload | string | undefined
    ) => {
      if (err) {
        throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
      }

      req.body.user = decoded; // Attach decoded payload to req.user
      next();
    }
  );
}

export function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.headers['x-refresh-token'] as string | undefined;
  if (!refreshToken) {
    throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_JWT_SECRET || 'smsk-refresh-jwt-secret',
    (
      err: jwt.VerifyErrors | null,
      decoded: jwt.JwtPayload | string | undefined
    ) => {
      if (err) {
        throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
      }

      req.body.user = decoded; // Attach decoded payload to req.user
      next();
    }
  );
}
