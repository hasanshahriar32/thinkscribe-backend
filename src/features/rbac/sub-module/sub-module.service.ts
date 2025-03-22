import { Knex } from 'knex';
import db from '../../../db/db';
import { getPaginatedData, getPagination } from '../../../utils/common';
import { ListQuery } from '../../../types/types';

export async function getSubModules(
  filters: ListQuery & {
    channel_id: string;
    module_id: string;
  }
) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('sub_module')
    .select(
      'sub_module.id',
      'sub_module.name',
      'sub_module.is_deleted',
      db.raw(`JSON_OBJECT('id', channel.id, 'name', channel.name) as channel`),
      db.raw(`JSON_OBJECT('id', module.id, 'name', module.name) as module`)
    )
    .leftJoin('channel', 'channel.id', 'sub_module.channel_id')
    .leftJoin('module', 'module.id', 'sub_module.module_id')
    .where('sub_module.is_deleted', 0)
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('sub_module').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('sub_module.created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('sub_module.name', `%${filters.keyword}%`);
    totalCountQuery.whereILike('sub_module.name', `%${filters.keyword}%`);
  }

  if (filters.channel_id) {
    query.whereILike('sub_module.channel_id', `${filters.channel_id}`);
    totalCountQuery.whereILike(
      'sub_module.channel_id',
      `${filters.channel_id}`
    );
  }
  if (filters.module_id) {
    query.whereILike('sub_module.module_id', `${filters.module_id}`);
    totalCountQuery.whereILike('sub_module.module_id', `${filters.module_id}`);
  }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
}

export async function getSubModule(id: string | number) {
  const subModule = await db
    .table('sub_module')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return subModule[0] || null;
}

export async function createSubModule(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('sub_module').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function createMultiSubModules(
  data: Record<string, unknown>[],
  trx?: Knex.Transaction
) {
  console.log('DATA', data);
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

export async function deleteSubModule(
  id: string | number,
  trx?: Knex.Transaction
) {
  const query = db.table('sub_module').where('id', id).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteMultiSubModules(
  ids: string[],
  trx?: Knex.Transaction
) {
  const query = db.table('sub_module').whereIn('id', ids).del();

  if (trx) query.transacting(trx);

  return query;
}

export async function softDeleteSubModule(
  id: string | number,
  trx?: Knex.Transaction
) {
  const query = db
    .table('sub_module')
    .update({ is_deleted: true })
    .where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function softDeleteMultiSubModules(
  ids: string[] | number[],
  trx?: Knex.Transaction
) {
  const query = db
    .table('sub_module')
    .update({ is_deleted: true })
    .whereIn('id', ids);

  if (trx) query.transacting(trx);

  return query;
}

export async function getExistingSubModule(data: Record<string, unknown>) {
  const subModule = await db
    .table('sub_module')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return subModule[0] || null;
}
