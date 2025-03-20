import { Router } from 'express';
import {
  createOneSubModule,
  deleteOneSubModule,
  getAllSubModules,
  getOneSubModule,
  updateOneSubModule,
} from './sub-module.controller';
import { validateRequest } from '../../middlewares/validation';
import validator from './sub-module.validator';

const subModuleRoutes = Router();

subModuleRoutes.get(
  '/sub-modules',
  validateRequest(validator.moduleSelect),
  getAllSubModules
);
subModuleRoutes.get(
  '/sub-modules/:id',
  validateRequest(validator.moduleDetail),
  getOneSubModule
);
subModuleRoutes.post(
  '/sub-modules',
  validateRequest(validator.moduleCreate),
  createOneSubModule
);
subModuleRoutes.patch(
  '/sub-modules/:id',
  validateRequest(validator.moduleUpdate),
  updateOneSubModule
);
subModuleRoutes.delete(
  '/sub-modules/:id',
  validateRequest(validator.moduleDelete),
  deleteOneSubModule
);

export default subModuleRoutes;
