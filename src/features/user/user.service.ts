import { eq, and, or, sql } from 'drizzle-orm';
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';
import { users } from '../../db/schema/users';

// Helper: filter users by keyword (firstName, lastName, or primary email)
function buildUserKeywordFilter(keyword: string) {
  if (!keyword) return undefined;
  return or(
    sql`LOWER(${users.firstName}) LIKE LOWER('%' || ${keyword} || '%')`,
    sql`LOWER(${users.lastName}) LIKE LOWER('%' || ${keyword} || '%')`,
    sql`EXISTS (SELECT 1 FROM jsonb_array_elements(${users.emails}) elem WHERE LOWER(elem->>'email') LIKE LOWER('%' || ${keyword} || '%') AND elem->>'type' = 'primary')`
  );
}

export async function getUsers(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });
  const whereClause = buildUserKeywordFilter(filters.keyword || '');
  const data = await db
    .select()
    .from(users)
    .where(whereClause)
    .limit(pagination.limit)
    .offset(pagination.offset);
  return data;
}

export async function getUser(id: string | number) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));
  return user[0] || null;
}

export async function createUser(data: typeof users.$inferInsert) {
  const [created] = await db.insert(users).values(data).returning();
  return created;
}

export async function updateUser({
  id,
  data,
}: {
  id: string | number;
  data: Partial<typeof users.$inferInsert>;
}) {
  const [updated] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, Number(id)))
    .returning();
  return updated;
}

export async function deleteUser(id: string | number) {
  const [deleted] = await db
    .delete(users)
    .where(eq(users.id, Number(id)))
    .returning();
  return deleted;
}

// Find user by primary email in emails JSONB
export async function getUserByPrimaryEmail(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(sql`${users.emails} @> '[{"email": "${email}", "type": "primary"}]'`);
  return user[0] || null;
}
