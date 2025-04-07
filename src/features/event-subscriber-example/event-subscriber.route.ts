import { Router } from 'express';
import validator from './event-subscriber.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneEventSubscriber,
  deleteOneEventSubscriber,
  getAllEventSubscribers,
  getOneEventSubscriber,
  updateOneEventSubscriber,
} from './event-subscriber.controller';
import './subscriptions/create-event-emitter';

const eventSubscriberRoutes = Router();

eventSubscriberRoutes.get(
  '/event-subscribers',
  validateRequest(validator.select),
  getAllEventSubscribers
);
eventSubscriberRoutes.get(
  '/event-subscribers/:id',
  validateRequest(validator.detail),
  getOneEventSubscriber
);
eventSubscriberRoutes.post(
  '/event-subscribers',
  validateRequest(validator.create),
  createOneEventSubscriber
);
eventSubscriberRoutes.patch(
  '/event-subscribers/:id',
  validateRequest(validator.update),
  updateOneEventSubscriber
);
eventSubscriberRoutes.delete(
  '/event-subscribers/:id',
  validateRequest(validator.delete),
  deleteOneEventSubscriber
);

export default eventSubscriberRoutes;
