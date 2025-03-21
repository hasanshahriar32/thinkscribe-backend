import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getPermissions(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('permission')
    .select(
      'permission.id',
      'permission.is_deleted',
      db.raw(`JSON_OBJECT('id', channel.id, 'name', channel.name) as channel`),
      db.raw(`JSON_OBJECT('id', module.id, 'name', module.name) as module`),
      db.raw(
        `JSON_OBJECT('id', sub_module.id, 'name', sub_module.name) as sub_module`
      ),
      db.raw(`JSON_OBJECT('id', role.id, 'name', role.name) as role`),
      db.raw(`JSON_OBJECT('id', action.id, 'name', action.name) as action`)
    )
    .leftJoin('channel', 'channel.id', 'permission.channel_id')
    .leftJoin('module', 'module.id', 'permission.module_id')
    .leftJoin('sub_module', 'sub_module.id', 'permission.sub_module_id')
    .leftJoin('role', 'role.id', 'permission.role_id')
    .leftJoin('action', 'action.id', 'permission.action_id')
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('permission').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('permission.created_at', 'desc');
  }

  // if (filters.keyword) {
  //   query.whereILike('permission.name', `%${filters.keyword}%`);
  //   totalCountQuery.whereILike('permission.name', `%${filters.keyword}%`);
  // }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
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

export async function deletePermission(id: string | number) {
  return db.table('permission').where('id', id).del();
}

export async function getExistingPermission(data: Record<string, unknown>) {
  const permission = await db
    .table('permission')
    .select('id', 'is_deleted')
    .where(data);
  return permission[0] || null;
}
