import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './user.service';
import { ListQuery } from '../../types/types';

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getUsers(req.query as unknown as ListQuery);
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUser(req.params.id);
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function createOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Accepts: firstName, lastName, emails (array of { email, type })
    const { firstName, lastName, emails } = req.body;
    if (
      !firstName ||
      !lastName ||
      !emails ||
      !Array.isArray(emails) ||
      emails.length === 0
    ) {
      throw new AppError('firstName, lastName, and at least one email are required', 400);
    }
    const payload = {
      firstName,
      lastName,
      emails,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdUser = await createUser(payload);
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Accepts: firstName, lastName, emails (array of { email, type })
    const { firstName, lastName, emails } = req.body;
    const payload: any = {};
    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;
    if (emails && Array.isArray(emails)) payload.emails = emails;
    payload.updatedAt = new Date();
    const updatedUser = await updateUser({
      id: req.params.id,
      data: payload,
    });
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.UPDATE,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deletedUser = await deleteUser(req.params.id);
    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}
