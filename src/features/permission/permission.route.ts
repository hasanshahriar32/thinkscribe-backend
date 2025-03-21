import { Router } from 'express';
import {
  createOnePermission,
  deleteOnePermission,
  getAllPermissions,
  getOnePermission,
  updateOnePermission,
} from './permission.controller';
import { validateRequest } from '../../middlewares/validation';
import validator from './permission.validator';

const permissionRoutes = Router();

permissionRoutes.get(
  '/permissions',
  validateRequest(validator.select),
  getAllPermissions
);
permissionRoutes.get(
  '/permissions/:id',
  validateRequest(validator.detail),
  getOnePermission
);
permissionRoutes.post(
  '/permissions',
  validateRequest(validator.create),
  createOnePermission
);
permissionRoutes.patch(
  '/permissions/:id',
  validateRequest(validator.update),
  updateOnePermission
);
permissionRoutes.delete(
  '/permissions/:id',
  validateRequest(validator.delete),
  deleteOnePermission
);

export default permissionRoutes;
