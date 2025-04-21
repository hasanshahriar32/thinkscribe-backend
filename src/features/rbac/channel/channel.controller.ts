import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../../utils/http';
import { MESSAGES } from '../../../configs/messages';
import {
  createChannel,
  deleteChannel,
  getChannel,
  getChannels,
  updateChannel,
  getExistingChannel,
  createMultiChannels,
  deleteMultiChannels,
  softDeleteChannel,
  softDeleteMultiChannels,
} from './channel.service';
import db from '../../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';

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
      id: uuidv4(),
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

export async function createChannels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const payload = req.body.channel.map((action: Record<string, unknown>) => ({
      id: uuidv4(),
      name: action.name,
      created_by: req.body.user.id,
    }));
    await createMultiChannels(payload, trx);

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

export async function deleteChannels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await deleteMultiChannels(req.body.ids, trx);

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

export async function softDeleteOneChannel(
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

    const deletedChannel = await softDeleteChannel(req.params.id);

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

export async function softDeleteChannels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await softDeleteMultiChannels(req.body.ids, trx);

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
