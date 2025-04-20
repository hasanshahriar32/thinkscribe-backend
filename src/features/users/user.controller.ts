import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createMultiUsers,
  createUser,
  deleteMultiUsers,
  deleteUser,
  getExistingUser,
  getUser,
  getUsers,
  hashPassword,
  softDeleteMultiUsers,
  softDeleteUser,
  updateUser,
} from './user.service';
import db from '../../db/db';
import { Knex } from 'knex';
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
      img: req.body.img,
      created_by: req.body.user.id,
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

export async function createUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = req.body.productCategories.map(
      (pd: Record<string, unknown>) => ({
        id: uuidv4(),
        name: pd.name,
        created_by: req.body.user.id,
      })
    );
    const createdUsers = await createMultiUsers(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdUsers,
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
      updated_by: req.body.user.id,
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
    const deletedUser = await deleteUser(req.params.id, trx);

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

export async function deleteUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    console.log('controller', req.body.ids);
    const deletedUsers = await deleteMultiUsers(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedUsers,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function softDeleteOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedUser = await getExistingUser({
      id: req.params.id,
    });

    if (!isExistedUser) throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedUser = await softDeleteUser(req.params.id);

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

export async function softDeleteUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const deletedUsers = await softDeleteMultiUsers(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedUsers,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
