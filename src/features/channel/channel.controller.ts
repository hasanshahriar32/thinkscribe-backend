import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createChannel,
  deleteChannel,
  getChannel,
  getChannels,
  updateChannel,
  getExistingChannel,
} from './channel.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';

export async function getAllChannels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getChannels(req.query as unknown as ListQuery);

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

export async function getOneChannel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getChannel(req.params.id);

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

export async function createOneChannel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingChannel = await getExistingChannel({
      name: req.body.name,
    });
    if (existingChannel)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      created_by: req.body.user.id,
    };
    const createdChannel = await createChannel(payload, trx);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdChannel,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneChannel(
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
    const updatedChannel = await updateChannel(
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
      data: updatedChannel,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneChannel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const isExistedChannel = await getExistingChannel({
      id: req.params.id,
    });

    if (!isExistedChannel) throw new AppError(MESSAGES.ERROR.BAD_REQUEST, 400);

    const deletedChannel = await deleteChannel(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedChannel,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
