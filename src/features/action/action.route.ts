import { Router } from 'express';
import {
  createOneAction,
  deleteOneAction,
  getAllActions,
  getOneAction,
  updateOneAction,
} from './action.controller';
import { validateRequest } from '../../middlewares/validation';
import validator from './action.validator';

const actionRoutes = Router();

actionRoutes.get('/actions', validateRequest(validator.select), getAllActions);
actionRoutes.get(
  '/actions/:id',
  validateRequest(validator.detail),
  getOneAction
);
actionRoutes.post(
  '/actions',
  validateRequest(validator.create),
  createOneAction
);
actionRoutes.patch(
  '/actions/:id',
  validateRequest(validator.update),
  updateOneAction
);
actionRoutes.delete(
  '/actions/:id',
  validateRequest(validator.delete),
  deleteOneAction
);

export default actionRoutes;
