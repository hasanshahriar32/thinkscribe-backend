import { Router } from 'express';
import {
  createRoles,
  createOneRole,
  deleteRoles,
  deleteOneRole,
  getAllRoles,
  getOneRole,
  softDeleteRoles,
  softDeleteOneRole,
  updateOneRole,
} from './role.controller';
import { validateRequest } from '../../../middlewares/validation';
import validator from './role.validator';

const roleRoutes = Router();

roleRoutes.get('/roles', validateRequest(validator.select), getAllRoles);
roleRoutes.get('/roles/:id', validateRequest(validator.detail), getOneRole);
roleRoutes.post(
  '/roles/create',
  validateRequest(validator.create),
  createOneRole
);
roleRoutes.post(
  '/roles/create-multi',
  validateRequest(validator.createMulti),
  createRoles
);
roleRoutes.patch(
  '/roles/update/:id',
  validateRequest(validator.update),
  updateOneRole
);
roleRoutes.delete(
  '/roles/delete/:id',
  validateRequest(validator.delete),
  deleteOneRole
);
roleRoutes.post(
  '/roles/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteRoles
);
roleRoutes.delete(
  '/roles/soft-delete/:id',
  validateRequest(validator.delete),
  softDeleteOneRole
);
roleRoutes.post(
  '/roles/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  softDeleteRoles
);

export default roleRoutes;
