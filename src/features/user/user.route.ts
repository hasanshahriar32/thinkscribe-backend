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
import { ACTIONS, MODULES, ROLES, SUB_MODULES } from '../../configs/rbac';

const userRoutes = Router();

userRoutes.get(
  '/users',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER,
  }),
  validateRequest(validator.select),
  getAllUsers
);
userRoutes.get(
  '/users/:id',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER,
  }),
  validateRequest(validator.detail),
  getOneUser
);
userRoutes.post(
  '/users',
  verifyRBAC({
    action: ACTIONS.CREATE,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER,
  }),
  upload.single('file'),
  validateRequest(validator.create),
  createOneUser
);
userRoutes.patch(
  '/users/:id',
  verifyRBAC({
    action: ACTIONS.UPDATE,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER,
  }),
  validateRequest(validator.update),
  updateOneUser
);
userRoutes.delete(
  '/users/:id',
  verifyRBAC({
    action: ACTIONS.DELETE,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER,
  }),
  validateRequest(validator.delete),
  deleteOneUser
);

export default userRoutes;
