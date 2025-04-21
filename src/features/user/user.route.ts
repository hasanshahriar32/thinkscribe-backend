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
import verifyRBAC from '../../middlewares/rbac';
import { ACTIONS, MODULES, ROLES, SUB_MODULES } from '../../configs/rbac';
import { upload } from '../../utils/multer-upload';

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
  (req, res, next) => {
    console.log('Request body:', req.body);
    next();
  },
  verifyRBAC({
    action: ACTIONS.CREATE,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER,
  }),
  validateRequest(validator.create),
  upload.single('file'),
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
