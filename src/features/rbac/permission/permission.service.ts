import { Knex } from 'knex';
import db from '../../../db/db';

export async function getPermissions(filters: Record<string, unknown>) {
  const query = db
    .table('permission')
    .select(
      'permission.id',
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
    .leftJoin('user', 'user.role_id', 'permission.role_id')
    .leftJoin('channel', 'channel.id', 'permission.channel_id')
    .leftJoin('module', 'module.id', 'permission.module_id')
    .leftJoin('sub_module', 'sub_module.id', 'permission.sub_module_id')
    .leftJoin('role', 'role.id', 'permission.role_id')
    .leftJoin('action', 'action.id', 'permission.action_id')
    .groupBy(
      'permission.id',
      'permission.module_id',
      'module.name',
      'permission.sub_module_id',
      'sub_module.name',
      'permission.role_id',
      'role.name',
      'permission.channel_id',
      'channel.name'
    );

  if (filters.user_id) query.where('user.id', '=', filters.user_id);
  if (filters.rold_id) query.where('role.id', '=', filters.rold_id);

  return query;
}

export async function getPermissionsByUser(userId: string) {
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
    .leftJoin('user', 'user.role_id', 'permission.role_id')
    .leftJoin('channel', 'channel.id', 'permission.channel_id')
    .leftJoin('module', 'module.id', 'permission.module_id')
    .leftJoin('sub_module', 'sub_module.id', 'permission.sub_module_id')
    .leftJoin('role', 'role.id', 'permission.role_id')
    .leftJoin('action', 'action.id', 'permission.action_id')
    .where('user.id', '=', userId)
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

  return permissions;
}

export async function getPermission(id: string | number) {
  const permission = await db
    .table('permission')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return permission[0] || null;
}

export async function createPermission(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('permission').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function createMultiPermissions(
  data: Record<string, unknown>[],
  trx?: Knex.Transaction
) {
  const query = db.table('permission').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updatePermission(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('permission').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deletePermission(
  id: string | number,
  trx?: Knex.Transaction
) {
  const query = db.table('permission').where('id', id).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteMultiPermissions(
  role_id: string,
  trx?: Knex.Transaction
) {
  const query = db.table('permission').where('role_id', role_id).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function getExistingPermission(data: Record<string, unknown>) {
  const permission = await db
    .table('permission')
    .select('id', 'is_deleted')
    .where(data);
  return permission[0] || null;
}
