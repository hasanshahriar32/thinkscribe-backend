import { Router } from 'express';
import validator from './user.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneUser,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
} from './user.controller';

const userRoutes = Router();

userRoutes.get('/users', validateRequest(validator.select), getAllUsers);
userRoutes.get('/users/:id', validateRequest(validator.detail), getOneUser);
userRoutes.post('/users', validateRequest(validator.create), createOneUser);
userRoutes.patch(
  '/users/:id',
  validateRequest(validator.update),
  updateOneUser
);
userRoutes.delete(
  '/users/:id',
  validateRequest(validator.delete),
  deleteOneUser
);

export default userRoutes;
