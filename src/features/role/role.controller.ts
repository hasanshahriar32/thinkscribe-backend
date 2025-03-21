import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
  getExistingRole,
} from './role.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';

export async function getAllRoles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getRoles(req.query as unknown as ListQuery);

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

export async function getOneRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getRole(req.params.id);

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

export async function createOneRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingRole = await getExistingRole({
      name: req.body.name,
    });
    if (existingRole)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      created_by: req.body.user.id,
    };
    const createdRole = await createRole(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdRole,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneRole(
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
    const updatedRole = await updateRole(
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
      data: updatedRole,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedRole = await getExistingRole({
      id: req.params.id,
    });

    if (!isExistedRole) throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedRole = await deleteRole(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedRole,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
