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
import upload from '../../3rd-services/multer-upload';

const userRoutes = Router();

userRoutes.get('/users', validateRequest(validator.select), getAllUsers);
userRoutes.get('/users/:id', validateRequest(validator.detail), getOneUser);
userRoutes.post(
  '/users',
  validateRequest(validator.create),
  upload.single('file'),
  createOneUser
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

export default userRoutes;
