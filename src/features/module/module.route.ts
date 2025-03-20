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

moduleRoutes.get(
  '/modules',
  validateRequest(validator.moduleSelect),
  getAllModules
);
moduleRoutes.get(
  '/modules/:id',
  validateRequest(validator.moduleDetail),
  getOneModule
);
moduleRoutes.post(
  '/modules',
  validateRequest(validator.moduleCreate),
  createOneModule
);
moduleRoutes.patch(
  '/modules/:id',
  validateRequest(validator.moduleUpdate),
  updateOneModule
);
moduleRoutes.delete(
  '/modules/:id',
  validateRequest(validator.moduleDelete),
  deleteOneModule
);

export default moduleRoutes;
