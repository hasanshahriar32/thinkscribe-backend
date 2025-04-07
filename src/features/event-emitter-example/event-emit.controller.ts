import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createEventEmitter,
  deleteEventEmitter,
  getExistingEventEmitter,
  getEventEmitter,
  getEventEmitters,
  updateEventEmitter,
} from './event-emit.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';
import { eventBus } from '../../events/event-bus';

export async function getAllEventEmitters(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getEventEmitters(req.query as unknown as ListQuery);

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

export async function getOneEventEmitter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getEventEmitter(req.params.id);

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

export async function createOneEventEmitter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingEventEmitter = await getExistingEventEmitter({
      name: req.body.name,
    });
    if (existingEventEmitter)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      created_by: req.body.user.id,
    };
    const createdEventEmitter = await createEventEmitter(payload, trx);

    /**
     * * This event need to be subscribed by
     * * event subscriber example module
     */
    eventBus.emit('create-event-emitter', {
      id: createdEventEmitter[0],
      name: req.body.name,
      created_by: req.body.user.id,
    });
    console.log('Event emitted:', {
      id: createdEventEmitter[0],
      name: req.body.name,
      created_by: req.body.user.id,
    });

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdEventEmitter,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneEventEmitter(
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
    const updatedEventEmitter = await updateEventEmitter(
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
      data: updatedEventEmitter,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneEventEmitter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const deletedEventEmitter = await deleteEventEmitter(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedEventEmitter,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
