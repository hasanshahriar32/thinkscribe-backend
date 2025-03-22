import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createPermission,
  deletePermission,
  getPermission,
  getPermissionsByUser,
  updatePermission,
  getExistingPermission,
  deleteMultiPermissions,
  createMultiPermissions,
} from './permission.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { channel } from 'diagnostics_channel';

export async function getAllPermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getPermissionsByUser(req.query.user_id as string);

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
    const hehe = {
      role: 'role_id',
      permissions: [
        {
          module_id: 'module1',
          sub_module_id: 'sub module1',
          channel: 'channel1',
          actions: ['action1', 'action2'],
        },
        {
          module_id: 'module2',
          sub_module_id: 'sub module2',
          channel: 'channel2',
          actions: ['action1', 'action2'],
        },
        {
          module_id: 'module3',
          sub_module_id: 'sub module3',
          channel_id: 'channel3',
          actions: ['action1', 'action2'],
        },
      ],
    };

    await deleteMultiPermissions(req.body.role_id, trx);

    const preparedMultiCreatePayload = req.body.permissions.flatMap(
      (permission: Record<string, any>) =>
        permission.actions.map((action_id: string | number) => ({
          action_id,
          role_id: req.body.role_id,
          module_id: permission.module_id,
          sub_module_id: permission.sub_module_id,
          channel_id: permission.channel_id,
        }))
    );
    await createMultiPermissions(preparedMultiCreatePayload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.UPDATE,
      data: null,
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
