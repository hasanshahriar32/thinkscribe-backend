import { Knex } from 'knex';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';

export async function getEventSubscribers(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });

  const query = db
    .table('event_subscriber')
    .select(
      'event_subscriber.id',
      'event_subscriber.name',
      'event_subscriber.is_deleted'
    )
    .limit(pagination.limit)
    .offset(pagination.offset);
  const totalCountQuery = db.table('event_subscriber').count('* as count');

  if (filters.sort) {
    query.orderBy(filters.sort, filters.order || 'asc');
  } else {
    query.orderBy('event_subscriber.created_at', 'desc');
  }

  if (filters.keyword) {
    query.whereILike('event_subscriber.name', `%${filters.keyword}%`);
    totalCountQuery.whereILike('event_subscriber.name', `%${filters.keyword}%`);
  }

  return getPaginatedData(query, totalCountQuery, filters, pagination);
}

export async function getEventSubscriber(id: string | number) {
  const event_subscriber = await db
    .table('event_subscriber')
    .select('id', 'name', 'is_deleted')
    .where('id', id);
  return event_subscriber[0] || null;
}

export async function createEventSubscriber(
  data: Record<string, unknown>,
  trx?: Knex.Transaction
) {
  const query = db.table('event_subscriber').insert(data);

  if (trx) query.transacting(trx);

  return query;
}

export async function updateEventSubscriber(
  {
    id,
    data,
  }: {
    id: string | number;
    data: Record<string, unknown>;
  },
  trx?: Knex.Transaction
) {
  const query = db.table('event_subscriber').update(data).where('id', id);

  if (trx) query.transacting(trx);

  return query;
}

export async function deleteEventSubscriber(id: string | number) {
  return db.table('event_subscriber').where('id', id).del();
}

export async function getExistingEventSubscriber(
  data: Record<string, unknown>
) {
  const event_subscriber = await db
    .table('event_subscriber')
    .select('id', 'name', 'is_deleted')
    .where(data);
  return event_subscriber[0] || null;
}
