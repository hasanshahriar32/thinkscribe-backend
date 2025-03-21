import { Request, Response, NextFunction } from 'express';
import db from '../db/db';
import { AppError } from '../utils/http';
import { MESSAGES } from '../configs/messages';

interface Permission {
  module_id: number;
  sub_module_id: number;
  role_id: string[];
  channel_id: string[];
  action_name: string;
  module_name: string;
  sub_module_name: string;
  channel_name: string;
}

interface RBACParams {
  roles: string[];
  action: string;
  channel: string[];
  module?: string;
  subModule?: string;
}

const verifyRBAC = ({
  roles,
  action,
  channel,
  module,
  subModule,
}: RBACParams) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: Record<string, unknown> = req.body.user;

      if (!roles.includes(user.role_id as string)) {
        throw new AppError(MESSAGES.ERROR.NO_PERMISSION, 403);
      }

      // Fetch the user's permissions based on their role and check against required attributes
      const permissions = await db
        .table('permission')
        .select(
          'channel.name as channel',
          'module.name as module',
          'sub_module.name as sub_module',
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
        .where('permission.role_id', '=', user.role_id as string)
        .andWhere('module.name', '=', module as string)
        .andWhere('sub_module.name', '=', subModule as string)
        .groupBy(
          'permission.id',
          'permission.channel_id',
          'permission.module_id',
          'permission.sub_module_id',
          'permission.role_id',
          'channel.id',
          'module.id',
          'sub_module.id',
          'role.id'
        );

      //   if (module) {
      //     permissions = permissions.filter(
      //       (permission) => permission.module_id === module
      //     );
      //   }

      //   if (subModule) {
      //     permissions = permissions.filter(
      //       (permission) => permission.sub_module_id === subModule
      //     );
      //   }

      // Check if the user has the required permission for the specified action
      const hasPermission = permissions.some(
        (permission) => permission.action_name === action
      );

      if (!hasPermission) {
        return res.status(403).json({
          message:
            'Forbidden: You do not have permission to access this resource',
        });
      }

      // If the user has permission, proceed to the next middleware/route handler
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default verifyRBAC;
