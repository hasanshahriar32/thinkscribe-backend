import { Router } from 'express';
import {
  getAllPermissions,
  updatePermissionsByRole,
} from './permission.controller';
import { validateRequest } from '../../../middlewares/validation';
import validator from './permission.validator';

const permissionRoutes = Router();

permissionRoutes.get(
  '/permissions',
  validateRequest(validator.select),
  getAllPermissions
);
permissionRoutes.patch(
  '/permissions',
  validateRequest(validator.update),
  updatePermissionsByRole
);

export default permissionRoutes;
