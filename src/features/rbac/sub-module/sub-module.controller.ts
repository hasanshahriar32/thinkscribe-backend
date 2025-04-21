import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../../utils/http';
import { MESSAGES } from '../../../configs/messages';
import {
  createSubModule,
  deleteSubModule,
  getSubModule,
  getSubModules,
  updateSubModule,
  getExistingSubModule,
  createMultiSubModules,
  deleteMultiSubModules,
  softDeleteSubModule,
  softDeleteMultiSubModules,
} from './sub-module.service';
import db from '../../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';

export async function getAllSubModules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getSubModules(
      req.query as unknown as ListQuery & {
        channel_id: string;
        module_id: string;
      }
    );

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

export async function getOneSubModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getSubModule(req.params.id);

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

export async function createOneSubModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingSubModule = await getExistingSubModule({
      name: req.body.name,
      channel_id: req.body.channel_id,
    });
    if (existingSubModule)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      id: uuidv4(),
      name: req.body.name,
      channel_id: req.body.channel_id,
      module_id: req.body.module_id,
      created_by: req.body.user.id,
    };
    const createdSubModule = await createSubModule(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdSubModule,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function createSubModules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = req.body.subModules.map(
      (subModule: Record<string, unknown>) => ({
        id: uuidv4(),
        name: subModule.name,
        channel_id: subModule.channel_id,
        module_id: subModule.module_id,
        created_by: req.body.user.id,
      })
    );
    await createMultiSubModules(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: null,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneSubModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = {
      name: req.body.name,
      channel_id: req.body.channel_id,
      updated_by: req.body.user.id,
    };
    const updatedSubModule = await updateSubModule(
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
      data: updatedSubModule,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneSubModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedSubModule = await getExistingSubModule({
      id: req.params.id,
    });

    if (!isExistedSubModule)
      throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedSubModule = await deleteSubModule(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedSubModule,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteSubModules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await deleteMultiSubModules(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: null,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function softDeleteOneSubModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedSubModule = await getExistingSubModule({
      id: req.params.id,
    });

    if (!isExistedSubModule)
      throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedSubModule = await softDeleteSubModule(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedSubModule,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function softDeleteSubModules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await softDeleteMultiSubModules(req.body.ids, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: null,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
