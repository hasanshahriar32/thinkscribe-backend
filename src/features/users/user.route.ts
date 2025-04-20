import { Router } from 'express';
import validator from './user.validator';
import { validateRequest } from '../../middlewares/validation';
import {
  createOneUser,
  createUsers,
  deleteOneUser,
  deleteUsers,
  getAllUsers,
  getOneUser,
  softDeleteOneUser,
  softDeleteUsers,
  updateOneUser,
} from './user.controller';

const userRoutes = Router();

userRoutes.get('/users', validateRequest(validator.select), getAllUsers);
userRoutes.get('/users/:id', validateRequest(validator.detail), getOneUser);
userRoutes.post('/users', validateRequest(validator.create), createOneUser);
userRoutes.post(
  '/users/create-multi',
  validateRequest(validator.createMulti),
  createUsers
);
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
userRoutes.post(
  '/users/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteUsers
);
userRoutes.delete(
  '/users/soft-delete/:id',
  validateRequest(validator.delete),
  softDeleteOneUser
);
userRoutes.post(
  '/users/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  softDeleteUsers
);

export default userRoutes;
