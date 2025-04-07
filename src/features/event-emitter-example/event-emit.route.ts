import { Router } from 'express';
import validator from './event-emit.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneEventEmitter,
  deleteOneEventEmitter,
  getAllEventEmitters,
  getOneEventEmitter,
  updateOneEventEmitter,
} from './event-emit.controller';

const eventEmitterRoutes = Router();

eventEmitterRoutes.get(
  '/event-emitters',
  validateRequest(validator.select),
  getAllEventEmitters
);
eventEmitterRoutes.get(
  '/event-emitters/:id',
  validateRequest(validator.detail),
  getOneEventEmitter
);
eventEmitterRoutes.post(
  '/event-emitters',
  validateRequest(validator.create),
  createOneEventEmitter
);
eventEmitterRoutes.patch(
  '/event-emitters/:id',
  validateRequest(validator.update),
  updateOneEventEmitter
);
eventEmitterRoutes.delete(
  '/event-emitters/:id',
  validateRequest(validator.delete),
  deleteOneEventEmitter
);

export default eventEmitterRoutes;
