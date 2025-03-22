import { Knex } from 'knex';
import db from '../../../db/db';
import { getPaginatedData, getPagination } from '../../../utils/common';
import { ListQuery } from '../../../types/types';

export async function getModules(filters: ListQuery & { channel_id: string }) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('module')
    .select(
      'module.id',
      'module.name',
      'module.is_deleted',
      db.raw(`JSON_OBJECT('id', channel.id, 'name', channel.name) as channel`)
    )
    .where('module.is_deleted', 0)
    .leftJoin('channel', 'channel.id', 'module.channel_id')
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('module').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('module.created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('module.name', `%${filters.keyword}%`);
    totalCountQuery.whereILike('module.name', `%${filters.keyword}%`);
  }

  if (filters.channel_id) {
    query.whereILike('module.channel_id', `${filters.channel_id}`);
    totalCountQuery.whereILike('module.channel_id', `${filters.channel_id}`);
  }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
}

export async function getModule(id: string | number) {
  const module = await db
    .table('module')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return module[0] || null;
}

export async function createModule(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('module').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function createMultiModules(
  data: Record<string, unknown>[],
  trx?: Knex.Transaction
) {
  console.log('DATA', data);
  const query = db.table('module').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateModule(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('module').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteModule(
  id: string | number,
  trx?: Knex.Transaction
) {
  const query = db.table('module').where('id', id).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteMultiModules(
  ids: string[],
  trx?: Knex.Transaction
) {
  const query = db.table('module').whereIn('id', ids).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function softDeleteModule(
  id: string | number,
  trx?: Knex.Transaction
) {
  const query = db.table('module').update({ is_deleted: true }).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function softDeleteMultiModules(
  ids: string[] | number[],
  trx?: Knex.Transaction
) {
  const query = db
    .table('module')
    .update({ is_deleted: true })
    .whereIn('id', ids);

  if (trx) query.transacting(trx);

  return query;
}

export async function getExistingModule(data: Record<string, unknown>) {
  const module = await db
    .table('module')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return module[0] || null;
}
