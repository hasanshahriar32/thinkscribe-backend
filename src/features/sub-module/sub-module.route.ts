import { Router } from 'express';
import validator from './sub-module.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneSubModule,
  deleteOneSubModule,
  getAllSubModules,
  getOneSubModule,
  updateOneSubModule,
} from './sub-module.controller';

const subModuleRoutes = Router();

subModuleRoutes.get(
  '/sub-modules',
  validateRequest(validator.select),
  getAllSubModules
);
subModuleRoutes.get(
  '/sub-modules/:id',
  validateRequest(validator.detail),
  getOneSubModule
);
subModuleRoutes.post(
  '/sub-modules',
  validateRequest(validator.create),
  createOneSubModule
);
subModuleRoutes.patch(
  '/sub-modules/:id',
  validateRequest(validator.update),
  updateOneSubModule
);
subModuleRoutes.delete(
  '/sub-modules/:id',
  validateRequest(validator.delete),
  deleteOneSubModule
);

export default subModuleRoutes;
