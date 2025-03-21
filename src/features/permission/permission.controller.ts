import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createPermission,
  deletePermission,
  getPermission,
  getPermissions,
  updatePermission,
  getExistingPermission,
} from './permission.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';

export async function getAllPermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getPermissions(req.query as unknown as ListQuery);

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

export async function getOnePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getPermission(req.params.id);

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

export async function createOnePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingPermission = await getExistingPermission({
      channel_id: req.body.channel_id,
      module_id: req.body.module_id,
      sub_module_id: req.body.sub_module_id,
      role_id: req.body.role_id,
      action_id: req.body.action_id,
      created_by: req.body.user.id,
    });
    if (existingPermission)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      channel_id: req.body.channel_id,
      module_id: req.body.module_id,
      sub_module_id: req.body.sub_module_id,
      role_id: req.body.role_id,
      action_id: req.body.action_id,
      created_by: req.body.user.id,
    };
    const createdPermission = await createPermission(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdPermission,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOnePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = {
      name: req.body.name,
      created_by: 'ab546ce6-f5f2-11ef-9bc1-32adce0096f0',
    };
    const updatedPermission = await updatePermission(
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
      data: updatedPermission,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOnePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedPermission = await getExistingPermission({
      id: req.params.id,
    });

    if (!isExistedPermission)
      throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedPermission = await deletePermission(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedPermission,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
