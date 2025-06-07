import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { MESSAGES } from '../configs/messages';
import { AppError } from '../utils/http';
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../configs/envConfig';

// Load environment variables from a .env file
dotenv.config();

/**
 * Middleware to verify access token
 * This function checks for the presence of a Bearer token in the Authorization header.
 * If valid, it decodes the token and attaches the payload to the request body.
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and correctly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // Verify the token using the secret key
  jwt.verify(
    token,
    JWT_SECRET,
    (
      err: jwt.VerifyErrors | null,
      decoded: jwt.JwtPayload | string | undefined
    ) => {
      if (err) {
        throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
      }

      // Attach decoded token payload to request body
      req.body.user = decoded;
      next();
    }
  );
}

/**
 * Middleware to verify refresh token
 * This function checks for the presence of a refresh token in the 'x-refresh-token' header.
 * If valid, it decodes the token and attaches the payload to the request body.
 */
export function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.headers['x-refresh-token'] as string | undefined;

  // Check if the refresh token is present
  if (!refreshToken) {
    throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
  }

  // Verify the refresh token using the secret key
  jwt.verify(
    refreshToken,
    REFRESH_JWT_SECRET,
    (
      err: jwt.VerifyErrors | null,
      decoded: jwt.JwtPayload | string | undefined
    ) => {
      if (err) {
        throw new AppError(MESSAGES.ERROR.UNAUTHORIZED, 401);
      }

      // Attach decoded token payload to request body
      req.body.user = decoded;
      next();
    }
  );
}
