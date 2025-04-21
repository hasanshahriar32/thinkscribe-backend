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
import upload from '../../utils/multer-upload';
import verifyRBAC from '../../middlewares/rbac';
import { ACTIONS, ROLES } from '../../configs/rbac';

const userRoutes = Router();

userRoutes.get(
  '/users',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: 'User Management',
    subModule: 'User Role Assign',
  }),
  validateRequest(validator.select),
  getAllUsers
);
userRoutes.get('/users/:id', validateRequest(validator.detail), getOneUser);
userRoutes.post(
  '/users',
  upload.single('file'),
  validateRequest(validator.create),
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
