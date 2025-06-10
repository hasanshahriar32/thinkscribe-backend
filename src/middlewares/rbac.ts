import { Request, Response, NextFunction } from 'express';
import db from '../db/db';
import { AppError } from '../utils/http';
import { MESSAGES } from '../configs/messages';
import { eq, and, inArray } from 'drizzle-orm';
import {
  userRoles,
  roles,
  rolePermissions,
  permissions,
  actions,
  modules,
  subModules,
} from '../db/schema/rbac';

interface RBACParams {
  roles: string[]; // Allowed roles for access
  action: string; // Required action (e.g., 'Create', 'Delete')
  module?: string; // Optional module name (e.g., 'User')
  subModule?: string; // Optional sub-module name (e.g., 'Profile')
}

/**
 * Middleware to verify if a user has permission to perform a specific action
 * based on their role and assigned permissions in the database.
 */
const verifyRBAC = ({
  roles: allowedRoles,
  action,
  module,
  subModule,
}: RBACParams) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Step 1: Get userId from request (adjust as per your auth logic)
      const userId = req.body.user?.id;
      if (!userId) return next(new AppError(MESSAGES.ERROR.NO_PERMISSION, 403));

      // Step 2: Get all roles assigned to the user
      const userRoleRows = await db
        .select({ roleId: userRoles.roleId })
        .from(userRoles)
        .where(eq(userRoles.userId, userId));
      const userRoleIds = userRoleRows
        .map((ur) => ur.roleId)
        .filter((id): id is number => id !== null && id !== undefined);
      if (!userRoleIds.length)
        return next(new AppError(MESSAGES.ERROR.NO_PERMISSION, 403));

      // Step 3: Get role names and check if any are allowed
      const userRoleNameRows = await db
        .select({ name: roles.name })
        .from(roles)
        .where(inArray(roles.id, userRoleIds));
      const userRoleNames = userRoleNameRows.map((r) => r.name);
      if (!userRoleNames.some((r) => allowedRoles.includes(r))) {
        return next(new AppError(MESSAGES.ERROR.NO_PERMISSION, 403));
      }

      // Step 4: Check permissions for the action/module/subModule
      const perms = await db
        .select({
          permissionId: permissions.id,
          actionName: actions.name,
          moduleName: modules.name,
          subModuleName: subModules.name,
        })
        .from(rolePermissions)
        .innerJoin(
          permissions,
          eq(rolePermissions.permissionId, permissions.id)
        )
        .innerJoin(actions, eq(permissions.actionId, actions.id))
        .innerJoin(modules, eq(permissions.moduleId, modules.id))
        .innerJoin(subModules, eq(permissions.subModuleId, subModules.id))
        .where(
          and(
            inArray(rolePermissions.roleId, userRoleIds),
            eq(actions.name, action),
            eq(modules.name, module ?? ''),
            eq(subModules.name, subModule ?? '')
          )
        );
      if (!perms.length) return next(new AppError(MESSAGES.ERROR.NO_PERMISSION, 403));
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default verifyRBAC;
