import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  hashPassword,
  updateUser,
} from './user.service';
import { ListQuery } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

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
    if (!req.file) {
      throw new AppError(`File is required!`, 400);
    }

    const password = await hashPassword(req.body.password);
    const payload = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone1: req.body.phone1,
      phone2: req.body.phone2,
      phone3: req.body.phone3,
      password: password,
      address1: req.body.address1,
      address2: req.body.address2,
      img: req.file.path,
      created_by: req.body.user.id,
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
    const payload = {
      name: req.body.name,
      price: req.body.price,
      updated_by: req.body.user.id,
    };
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
