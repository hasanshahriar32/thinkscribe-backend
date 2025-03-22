import { Router } from 'express';
import {
  createModules,
  createOneModule,
  deleteModules,
  deleteOneModule,
  getAllModules,
  getOneModule,
  softDeleteModules,
  softDeleteOneModule,
  updateOneModule,
} from './module.controller';
import { validateRequest } from '../../../middlewares/validation';
import validator from './module.validator';

const moduleRoutes = Router();

moduleRoutes.get('/modules', validateRequest(validator.select), getAllModules);
moduleRoutes.get(
  '/modules/:id',
  validateRequest(validator.detail),
  getOneModule
);
moduleRoutes.post(
  '/modules/create',
  validateRequest(validator.create),
  createOneModule
);
moduleRoutes.post(
  '/modules/create-multi',
  validateRequest(validator.createMulti),
  createModules
);
moduleRoutes.patch(
  '/modules/update/:id',
  validateRequest(validator.update),
  updateOneModule
);
moduleRoutes.delete(
  '/modules/delete/:id',
  validateRequest(validator.delete),
  deleteOneModule
);
moduleRoutes.post(
  '/modules/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteModules
);
moduleRoutes.delete(
  '/modules/soft-delete/:id',
  validateRequest(validator.delete),
  softDeleteOneModule
);
moduleRoutes.post(
  '/modules/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  softDeleteModules
);

export default moduleRoutes;
