import { Router } from 'express';
import {
  getAllPermissions,
  updatePermissionsByRole,
} from './permission.controller';
import { validateRequest } from '../../../middlewares/validation';
import validator from './permission.validator';
import verifyRBAC from '../../../middlewares/rbac';
import { ACTIONS, MODULES, ROLES, SUB_MODULES } from '../../../configs/rbac';

const permissionRoutes = Router();

permissionRoutes.get(
  '/permissions',
  verifyRBAC({
    action: ACTIONS.VIEW,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER_ROLE_ASSIGN,
  }),
  validateRequest(validator.select),
  getAllPermissions
);
permissionRoutes.patch(
  '/permissions',
  verifyRBAC({
    action: ACTIONS.UPDATE,
    roles: [ROLES.ADMIN],
    module: MODULES.USER_MANAGEMENT,
    subModule: SUB_MODULES.USER_ROLE_ASSIGN,
  }),
  validateRequest(validator.update),
  updatePermissionsByRole
);

export default permissionRoutes;
