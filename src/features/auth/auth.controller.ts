import { NextFunction, Request, response, Response } from 'express';
import {
  getAccessToken,
  getRefreshToken,
  getUser,
  verifyPassword,
} from './auth.service';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUser(req.body.username);
    if (!user) throw new AppError('User Not Found!', 400);

    const isCorrectPassword = await verifyPassword(
      user.password,
      req.body.password
    );
    if (!isCorrectPassword) throw new AppError('Incorrect Password!', 400);
    delete user.password;

    const accessToken = await getAccessToken(user);
    const refreshToken = await getRefreshToken({ id: user.id });

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: { accessToken, refreshToken, ...user },
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.send({ message: 'Signup successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing sale' });
  }
}
