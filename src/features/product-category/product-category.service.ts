import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getProductCategories(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('product_category')
    .select('id', 'name', 'is_deleted')
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('product_category').count('* as count');

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

export async function getProductCategory(id: string | number) {
  const product_category = await db
    .table('product_category')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return product_category[0] || null;
}

export async function createProductCategory(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('product_category').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateProductCategory(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('product_category').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteProductCategory(id: string | number) {
  return db.table('product_category').where('id', id).del();
}

export async function getExistingProductCategory(
  data: Record<string, unknown>
) {
  const product_category = await db
    .table('product_category')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return product_category[0] || null;
}
