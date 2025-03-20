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

roleRoutes.get('/roles', validateRequest(validator.select), getAllRoles);
roleRoutes.get('/roles/:id', validateRequest(validator.detail), getOneRole);
roleRoutes.post('/roles', validateRequest(validator.create), createOneRole);
roleRoutes.patch(
  '/roles/:id',
  validateRequest(validator.update),
  updateOneRole
);
roleRoutes.delete(
  '/roles/:id',
  validateRequest(validator.delete),
  deleteOneRole
);

export default roleRoutes;
