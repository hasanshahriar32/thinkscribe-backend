import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getEventEmitters(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('event_emitter')
    .select(
      'event_emitter.id',
      'event_emitter.name',
      'event_emitter.is_deleted'
    )
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('event_emitter').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('event_emitter.created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('event_emitter.name', `%${filters.keyword}%`);
    totalCountQuery.whereILike('event_emitter.name', `%${filters.keyword}%`);
  }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
}

export async function getEventEmitter(id: string | number) {
  const event_emitter = await db
    .table('event_emitter')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return event_emitter[0] || null;
}

export async function createEventEmitter(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('event_emitter').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateEventEmitter(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('event_emitter').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteEventEmitter(id: string | number) {
  return db.table('event_emitter').where('id', id).del();
}

export async function getExistingEventEmitter(data: Record<string, unknown>) {
  const event_emitter = await db
    .table('event_emitter')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return event_emitter[0] || null;
}
