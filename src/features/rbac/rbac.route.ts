import { Router } from 'express';
import {
  createOneModule,
  deleteOneModule,
  getAllModules,
  getOneModule,
  updateOneModule,
} from './rbac.controller';
import { validateRequest } from '../../middlewares/validation';
import validator from './rbac.validator';

const rbacRoutes = Router();

rbacRoutes.get(
  '/modules',
  validateRequest(validator.moduleSelect),
  getAllModules
);
rbacRoutes.get(
  '/modules/:id',
  validateRequest(validator.moduleDetail),
  getOneModule
);
rbacRoutes.post(
  '/modules',
  validateRequest(validator.moduleCreate),
  createOneModule
);
rbacRoutes.patch(
  '/modules/:id',
  validateRequest(validator.moduleUpdate),
  updateOneModule
);
rbacRoutes.delete(
  '/modules/:id',
  validateRequest(validator.moduleDelete),
  deleteOneModule
);

export default rbacRoutes;
