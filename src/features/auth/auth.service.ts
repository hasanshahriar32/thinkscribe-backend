import db from '../../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { users } from '../../db/schema/users';
import {
  userRoles,
  roles,
  permissions,
  actions,
  modules,
  subModules,
  rolePermissions,
} from '../../db/schema/rbac';
import { channels } from '../../db/schema/channels';
import { eq } from 'drizzle-orm';
dotenv.config();

export async function getUser(conds: Record<string, unknown>) {
  // Only support username or id lookup for login
  let userRows: any[] = [];
  if (conds.username) {
    userRows = await db
      .select()
      .from(users)
      .where(eq(users.username, conds.username as string));
  } else if (conds.id) {
    userRows = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(conds.id)));
  }
  const user = userRows[0];
  if (!user) return null;
  // Get role name via userRoles
  const userRole = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, user.id));
  let roleName = null;
  if (userRole[0]?.roleId) {
    const role = await db
      .select()
      .from(roles)
      .where(eq(roles.id, userRole[0].roleId));
    roleName = role[0]?.name || null;
  }
  return { ...user, role: roleName };
}

export async function getPermissionsByRole(roleId: number) {
  // Get all permissions for a role, including action/module/submodule/channel names
  const perms = await db
    .select({
      permissionId: permissions.id,
      actionName: actions.name,
      moduleName: modules.name,
      subModuleName: subModules.name,
      channelName: channels.name,
    })
    .from(rolePermissions)
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .innerJoin(actions, eq(permissions.actionId, actions.id))
    .innerJoin(modules, eq(permissions.moduleId, modules.id))
    .innerJoin(subModules, eq(permissions.subModuleId, subModules.id))
    // If you have channelId in permissions, join here; otherwise, remove this join
    //.innerJoin(channels, eq(permissions.channelId, channels.id))
    .where(eq(rolePermissions.roleId, roleId));
  return perms;
}

export async function getAccessToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'smsk-jwt-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  } as jwt.SignOptions);
}

export async function getRefreshToken(payload: Record<string, unknown>) {
  return jwt.sign(
    payload,
    process.env.REFRESH_JWT_SECRET || 'smsk-refresh-jwt-secret',
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN || '7d',
    } as jwt.SignOptions
  );
}

export async function verifyPassword(hashedPassword: string, password: string) {
  return bcrypt.compare(password, hashedPassword);
}
