import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getActions(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('action')
    .select('id', 'name', 'is_deleted')
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('action').count('* as count');

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

export async function getAction(id: string | number) {
  const action = await db
    .table('action')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return action[0] || null;
}

export async function createAction(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('action').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateAction(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('action').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteAction(id: string | number) {
  return db.table('action').where('id', id).del();
}

export async function getExistingAction(data: Record<string, unknown>) {
  const action = await db
    .table('action')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return action[0] || null;
}
