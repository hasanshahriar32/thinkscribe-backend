import { NextFunction, Request, Response } from 'express';
import {
  getAccessToken,
  getPermissionsByRole,
  getRefreshToken,
  getUser,
  verifyPassword,
} from './auth.service';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';

export async function login(req: Request, res: Response, next: NextFunction) {
  console.log(owef);
  try {
    const user = await getUser({ username: req.body.username });
    if (!user) throw new AppError(MESSAGES.ERROR.USER_NOT_FOUND, 400);

    const isCorrectPassword = await verifyPassword(
      user.password,
      req.body.password
    );
    if (!isCorrectPassword)
      throw new AppError(MESSAGES.ERROR.INVALID_CREDENTIAL, 400);
    delete user.password;

    const accessToken = await getAccessToken(user);
    const refreshToken = await getRefreshToken({ id: user.id });
    const userPermissions = await getPermissionsByRole(user.role_id);

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.LOGIN,
      data: {
        accessToken,
        refreshToken,
        ...user,
        permissions: userPermissions,
      },
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
    const user = await getUser({ id: req.body.user.id });
    if (!user) throw new AppError(MESSAGES.ERROR.USER_NOT_FOUND, 400);

    const accessToken = await getAccessToken(user);
    const refreshToken = await getRefreshToken({ id: user.id });

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
}
