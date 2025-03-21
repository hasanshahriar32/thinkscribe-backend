import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createAction,
  deleteAction,
  getAction,
  getActions,
  updateAction,
  getExistingAction,
} from './action.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';

export async function getAllActions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getActions(req.query as unknown as ListQuery);

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

export async function getOneAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getAction(req.params.id);

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

export async function createOneAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingAction = await getExistingAction({
      name: req.body.name,
    });
    if (existingAction)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      created_by: req.body.user.id,
    };
    const createdAction = await createAction(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdAction,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneAction(
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
    const updatedAction = await updateAction(
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
      data: updatedAction,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedAction = await getExistingAction({
      id: req.params.id,
    });

    if (!isExistedAction) throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedAction = await deleteAction(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedAction,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
