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
    .table('sub_modules')
    .select(
      'sub_modules.id',
      'sub_modules.name',
      'sub_modules.is_deleted',
      db.raw(
        `JSON_OBJECT('id', sub_modules_category.id, 'name', sub_modules_category.name) as category`
      )
    )
    .leftJoin(
      'sub_modules_category',
      'sub_modules_category.id',
      'sub_modules.category_id'
    )
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('sub_modules').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('sub_modules.created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('sub_modules.name', `%${filters.keyword}%`);
    totalCountQuery.whereILike('sub_modules.name', `%${filters.keyword}%`);
  }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
}

export async function getSubModule(id: string | number) {
  const sub_modules = await db
    .table('sub_modules')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return sub_modules[0] || null;
}

export async function createSubModule(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('sub_modules').insert(data);

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
  const query = db.table('sub_modules').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteSubModule(id: string | number) {
  return db.table('sub_modules').where('id', id).del();
}

export async function getExistingSubModule(data: Record<string, unknown>) {
  const sub_modules = await db
    .table('sub_modules')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return sub_modules[0] || null;
}
