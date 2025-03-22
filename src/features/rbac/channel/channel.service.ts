import { Knex } from 'knex';
import db from '../../../db/db';
import { getPaginatedData, getPagination } from '../../../utils/common';
import { ListQuery } from '../../../types/types';

export async function getChannels(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('channel')
    .select('id', 'name', 'is_deleted')
    .where('is_deleted', 0)
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('channel').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('name', `%${filters.keyword}%`);
    totalCountQuery.whereILike('name', `%${filters.keyword}%`);
  }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
}

export async function getChannel(id: string | number) {
  const channel = await db
    .table('channel')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return channel[0] || null;
}

export async function createChannel(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('channel').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function createMultiChannels(
  data: Record<string, unknown>[],
  trx?: Knex.Transaction
) {
  console.log('DATA', data);
  const query = db.table('channel').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateChannel(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('channel').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteChannel(
  id: string | number,
  trx?: Knex.Transaction
) {
  const query = db.table('channel').where('id', id).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteMultiChannels(
  ids: string[],
  trx?: Knex.Transaction
) {
  const query = db.table('channel').whereIn('id', ids).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function softDeleteChannel(
  id: string | number,
  trx?: Knex.Transaction
) {
  const query = db
    .table('channel')
    .update({ is_deleted: true })
    .where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function softDeleteMultiChannels(
  ids: string[] | number[],
  trx?: Knex.Transaction
) {
  const query = db
    .table('channel')
    .update({ is_deleted: true })
    .whereIn('id', ids);

  if (trx) query.transacting(trx);

  return query;
}

export async function getExistingChannel(data: Record<string, unknown>) {
  const channel = await db
    .table('channel')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return channel[0] || null;
}
