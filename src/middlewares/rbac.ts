import { Request, Response, NextFunction } from 'express';
import db from '../db/db';
import { AppError } from '../utils/http';
import { MESSAGES } from '../configs/messages';

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
const verifyRBAC = ({ roles, action, module, subModule }: RBACParams) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Step 1: Check if the user's role is in the allowed roles list
      if (!roles.includes(req.body.user.role as string)) {
        throw new AppError(MESSAGES.ERROR.NO_PERMISSION, 403);
      }

      // Step 2: Query the permissions from the database for the user's role
      const permissions = await db
        .table('permission')
        .select(
          'permission.module_id',
          'module.name as module',
          'permission.sub_module_id',
          'sub_module.name as sub_module',
          'permission.role_id',
          'role.name as role',
          'permission.channel_id',
          'channel.name as channel',
          db.raw(`
            JSON_ARRAYAGG(
              JSON_OBJECT('id', action.id, 'name', action.name)
            ) as actions
          `) // Group actions into a JSON array
        )
        .leftJoin('channel', 'channel.id', 'permission.channel_id')
        .leftJoin('module', 'module.id', 'permission.module_id')
        .leftJoin('sub_module', 'sub_module.id', 'permission.sub_module_id')
        .leftJoin('role', 'role.id', 'permission.role_id')
        .leftJoin('action', 'action.id', 'permission.action_id')
        .where('permission.role_id', '=', req.body.user.role_id)
        .groupBy(
          'permission.module_id',
          'module.name',
          'permission.sub_module_id',
          'sub_module.name',
          'permission.role_id',
          'role.name',
          'permission.channel_id',
          'channel.name'
        );

      // Step 3: Find the relevant permission entry for the given module/subModule
      const permission = permissions.find(
        (permission) =>
          permission.module === module && permission.sub_module === subModule
      );

      // If no matching module/subModule permission found, deny access
      if (!permission) {
        throw new AppError(MESSAGES.ERROR.NO_PERMISSION, 403);
      }

      // Step 4: Check if the specific action is allowed within the found permission
      const isValidAction = permission.actions.find(
        (ac: Record<string, unknown>) => ac.name === action
      );

      // If the action is not listed, deny access
      if (!isValidAction) {
        throw new AppError(MESSAGES.ERROR.NO_PERMISSION, 403);
      }

      // All checks passed, move to the next middleware or controller
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default verifyRBAC;
