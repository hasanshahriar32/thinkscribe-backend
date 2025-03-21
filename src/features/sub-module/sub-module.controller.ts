import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createSubModule,
  deleteSubModule,
  getExistingSubModule,
  getSubModule,
  getSubModules,
  updateSubModule,
} from './sub-module.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';

export async function getAllSubModules(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getSubModules(req.query as unknown as ListQuery);

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
    });
    if (existingSubModule)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      module_id: req.body.module_id,
      channel_id: req.body.channel_id,
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

export async function updateOneSubModule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
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
