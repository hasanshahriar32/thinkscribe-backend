import { Router } from 'express';
import {
  createOneModule,
  deleteOneModule,
  getAllModules,
  getOneModule,
  updateOneModule,
} from './module.controller';
import { validateRequest } from '../../middlewares/validation';
import validator from './module.validator';

const moduleRoutes = Router();

moduleRoutes.get('/modules', validateRequest(validator.select), getAllModules);
moduleRoutes.get(
  '/modules/:id',
  validateRequest(validator.detail),
  getOneModule
);
moduleRoutes.post(
  '/modules',
  validateRequest(validator.create),
  createOneModule
);
moduleRoutes.patch(
  '/modules/:id',
  validateRequest(validator.update),
  updateOneModule
);
moduleRoutes.delete(
  '/modules/:id',
  validateRequest(validator.delete),
  deleteOneModule
);

export default moduleRoutes;
