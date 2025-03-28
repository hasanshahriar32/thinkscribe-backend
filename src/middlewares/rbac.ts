import { Request, Response, NextFunction } from 'express';
import db from '../db/db';
import { AppError } from '../utils/http';
import { MESSAGES } from '../configs/messages';

interface RBACParams {
  roles: string[];
  action: string;
  module?: string;
  subModule?: string;
}

const verifyRBAC = ({ roles, action, module, subModule }: RBACParams) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!roles.includes(req.body.user.role as string)) {
        throw new AppError(MESSAGES.ERROR.NO_PERMISSION, 403);
      }

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
          `)
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

      const permission = permissions.find(
        (permission) =>
          permission.module === module && permission.sub_module === subModule
      );
      if (!permission) throw new AppError(MESSAGES.ERROR.NO_PERMISSION, 403);

      const isValidAction = permission.actions.find(
        (ac: Record<string, unknown>) => ac.name === action
      );
      if (!isValidAction) throw new AppError(MESSAGES.ERROR.NO_PERMISSION, 403);

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default verifyRBAC;
