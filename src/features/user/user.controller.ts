import { NextFunction, Request, Response } from 'express';
import { responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  hashPassword,
  updateUser,
} from './user.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types';

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
    const product = await getUser(req.params.id);

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.RETRIVE,
      data: product,
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
  const trx: Knex.Transaction = await db.transaction();
  try {
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
      img: req.body.img,
      created_by: 'ab546ce6-f5f2-11ef-9bc1-32adce0096f0',
    };
    const createdUser = await createUser(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdUser,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = {
      name: req.body.name,
      price: req.body.price,
      created_by: 'ab546ce6-f5f2-11ef-9bc1-32adce0096f0',
    };
    const updatedUser = await updateUser(
      {
        id: req.params.id,
        data: payload,
      },
      trx
    );

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.UPDATE,
      data: updatedUser,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const deletedUser = await deleteUser(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedUser,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
