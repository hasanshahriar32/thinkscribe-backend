import { Knex } from 'knex';
import db from '../../db/db';
import { getPagination } from '../../utils/common';
import { ListQuery } from '../../types';

export async function getProducts(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('product')
    .select('id', 'name', 'price', 'is_deleted')
    .limit(pagination.limit)
    .offset(pagination.offset);

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('name', `%${filters.keyword}%`);
  }

  // filter queries

  return query;
}

export async function getUser() {}

export async function getAccessToken() {}

export async function getRefreshToken() {}

export async function hashPassword() {}

export async function verifyPassword() {}
