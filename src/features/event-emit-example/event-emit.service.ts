import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getProducts(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('product')
    .select(
      'product.id',
      'product.name',
      'product.price',
      'product.is_deleted',
      db.raw(
        `JSON_OBJECT('id', product_category.id, 'name', product_category.name) as category`
      )
    )
    .leftJoin('product_category', 'product_category.id', 'product.category_id')
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('product').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('product.created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('product.name', `%${filters.keyword}%`);
    totalCountQuery.whereILike('product.name', `%${filters.keyword}%`);
  }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
}

export async function getProduct(id: string | number) {
  const product = await db
    .table('product')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return product[0] || null;
}

export async function createProduct(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('product').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateProduct(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('product').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteProduct(id: string | number) {
  return db.table('product').where('id', id).del();
}

export async function getExistingProduct(data: Record<string, unknown>) {
  const product = await db
    .table('product')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return product[0] || null;
}
