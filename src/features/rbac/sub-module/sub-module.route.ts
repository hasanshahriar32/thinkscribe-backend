import { Router } from 'express';
import {
  createSubModules,
  createOneSubModule,
  deleteSubModules,
  deleteOneSubModule,
  getAllSubModules,
  getOneSubModule,
  softDeleteSubModules,
  softDeleteOneSubModule,
  updateOneSubModule,
} from './sub-module.controller';
import { validateRequest } from '../../../middlewares/validation';
import validator from './sub-module.validator';

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
  '/sub-modules/create',
  validateRequest(validator.create),
  createOneSubModule
);
subModuleRoutes.post(
  '/sub-modules/create-multi',
  validateRequest(validator.createMulti),
  createSubModules
);
subModuleRoutes.patch(
  '/sub-modules/update/:id',
  validateRequest(validator.update),
  updateOneSubModule
);
subModuleRoutes.delete(
  '/sub-modules/delete/:id',
  validateRequest(validator.delete),
  deleteOneSubModule
);
subModuleRoutes.post(
  '/sub-modules/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteSubModules
);
subModuleRoutes.delete(
  '/sub-modules/soft-delete/:id',
  validateRequest(validator.delete),
  softDeleteOneSubModule
);
subModuleRoutes.post(
  '/sub-modules/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  softDeleteSubModules
);

export default subModuleRoutes;
