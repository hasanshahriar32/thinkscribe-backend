import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createModule,
  deleteModule,
  getModule,
  getModules,
  updateModule,
  getExistingModule,
} from './module.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';

export async function getAllModules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getModules(req.query as unknown as ListQuery);

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

export async function getOneModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getModule(req.params.id);

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

export async function createOneModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingModule = await getExistingModule({
      name: req.body.name,
    });
    if (existingModule)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      created_by: req.body.user.id,
    };
    const createdModule = await createModule(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdModule,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneModule(
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
    const updatedModule = await updateModule(
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
      data: updatedModule,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedModule = await getExistingModule({
      id: req.params.id,
    });

    if (!isExistedModule) throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedModule = await deleteModule(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedModule,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
