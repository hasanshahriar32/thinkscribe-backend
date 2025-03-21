import db from '../../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function getUser(conds: Record<string, unknown>) {
  const user = await db
    .table('user')
    .select(
      'id',
      'username',
      'password',
      'phone1',
      'email',
      'is_deleted',
      'role_id'
    )
    .where(conds);
  return user[0] || null;
}

export async function getPermissionsByRole(roleId: string) {
  const permissions = await db
    .table('permission')
    .select(
      'permission.id',
      'permission.is_deleted',
      'permission.channel_id',
      'channel.name as channel',
      'permission.module_id',
      'module.name as module',
      'permission.sub_module_id',
      'sub_module.name as sub_module',
      'permission.role_id',
      'role.name as role',
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
    .where('permission.role_id', '=', roleId)
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
  return permissions;
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
