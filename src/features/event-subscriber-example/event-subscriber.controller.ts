import { NextFunction, Request, Response } from 'express';
import { AppError, responseData } from '../../utils/http';
import { MESSAGES } from '../../configs/messages';
import {
  createEventSubscriber,
  deleteEventSubscriber,
  getExistingEventSubscriber,
  getEventSubscriber,
  getEventSubscribers,
  updateEventSubscriber,
} from './event-subscriber.service';
import db from '../../db/db';
import { Knex } from 'knex';
import { ListQuery } from '../../types/types';
import { eventBus } from '../../events/event-bus';

export async function getAllEventSubscribers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getEventSubscribers(req.query as unknown as ListQuery);

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

export async function getOneEventSubscriber(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await getEventSubscriber(req.params.id);

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

export async function createOneEventSubscriber(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const existingEventSubscriber = await getExistingEventSubscriber({
      name: req.body.name,
    });
    if (existingEventSubscriber)
      throw new AppError(`${req.body.name} is already existed!`, 400);

    const payload = {
      name: req.body.name,
      event_emitter_id: req.body.event_emitter_id,
      created_by: req.body.user.id,
    };
    const createdEventSubscriber = await createEventSubscriber(payload, trx);

    /**
     * * This event need to be subscribed by
     * * event subscriber example module
     */
    eventBus.emit('create-event-emitter', {
      id: createdEventSubscriber[0],
      name: req.body.name,
      created_by: req.body.user.id,
    });

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.CREATE,
      data: createdEventSubscriber,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function updateOneEventSubscriber(
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
    const updatedEventSubscriber = await updateEventSubscriber(
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
      data: updatedEventSubscriber,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}

export async function deleteOneEventSubscriber(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const trx: Knex.Transaction = await db.transaction();
  try {
    const deletedEventSubscriber = await deleteEventSubscriber(req.params.id);

    await trx.commit();

    responseData({
      res,
      status: 200,
      message: MESSAGES.SUCCESS.DELETE,
      data: deletedEventSubscriber,
    });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}
