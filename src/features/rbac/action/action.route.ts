import { Router } from 'express';
import {
  createActions,
  createOneAction,
  deleteActions,
  deleteOneAction,
  getAllActions,
  getOneAction,
  softDeleteActions,
  softDeleteOneAction,
  updateOneAction,
} from './action.controller';
import { validateRequest } from '../../../middlewares/validation';
import validator from './action.validator';

const actionRoutes = Router();

actionRoutes.get('/actions', validateRequest(validator.select), getAllActions);
actionRoutes.get(
  '/actions/:id',
  validateRequest(validator.detail),
  getOneAction
);
actionRoutes.post(
  '/actions/create',
  validateRequest(validator.create),
  createOneAction
);
actionRoutes.post(
  '/actions/create-multi',
  validateRequest(validator.createMulti),
  createActions
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
actionRoutes.post(
  '/actions/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteActions
);
actionRoutes.delete(
  '/actions/soft-delete/:id',
  validateRequest(validator.delete),
  softDeleteOneAction
);
actionRoutes.post(
  '/actions/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  softDeleteActions
);

export default actionRoutes;
