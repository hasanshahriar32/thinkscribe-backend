import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getModules(filters: ListQuery) {
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
      'channel.name as channel',
      `channel.id as channel_id`
    )
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

export async function deleteModule(id: string | number) {
  return db.table('module').where('id', id).del();
}

export async function getExistingModule(data: Record<string, unknown>) {
  const module = await db
    .table('module')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return module[0] || null;
}
