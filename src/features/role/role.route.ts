import { Router } from 'express';
import {
  createOneRole,
  deleteOneRole,
  getAllRoles,
  getOneRole,
  updateOneRole,
} from './role.controller';
import { validateRequest } from '../../middlewares/validation';
import validator from './role.validator';

const roleRoutes = Router();

roleRoutes.get('/roles', validateRequest(validator.moduleSelect), getAllRoles);
roleRoutes.get(
  '/roles/:id',
  validateRequest(validator.moduleDetail),
  getOneRole
);
roleRoutes.post(
  '/roles',
  validateRequest(validator.moduleCreate),
  createOneRole
);
roleRoutes.patch(
  '/roles/:id',
  validateRequest(validator.moduleUpdate),
  updateOneRole
);
roleRoutes.delete(
  '/roles/:id',
  validateRequest(validator.moduleDelete),
  deleteOneRole
);

export default roleRoutes;
