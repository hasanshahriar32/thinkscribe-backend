import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getSubModules(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('sub_module')
    .select('id', 'name', 'is_deleted')
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('sub_module').count('* as count');

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

export async function getSubModule(id: string | number) {
  const sub_module = await db
    .table('sub_module')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return sub_module[0] || null;
}

export async function createSubModule(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('sub_module').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateSubModule(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('sub_module').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteSubModule(id: string | number) {
  return db.table('sub_module').where('id', id).del();
}

export async function getExistingSubModule(data: Record<string, unknown>) {
  const sub_module = await db
    .table('sub_module')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return sub_module[0] || null;
}
