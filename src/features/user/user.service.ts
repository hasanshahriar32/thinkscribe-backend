import { eq, ilike, and } from 'drizzle-orm';
// You need to create this schema file for users if not present
import db from '../../db/db';
import { getPaginatedData, getPagination } from '../../utils/common';
import { ListQuery } from '../../types/types';
import bcrypt from 'bcrypt';
import { users } from '../../db/schema/users';

export async function getUsers(filters: ListQuery) {
  const pagination = getPagination({
    page: filters.page as number,
    size: filters.size as number,
  });
  let whereClause = undefined;
  if (filters.keyword) {
    whereClause = ilike(users.name, `%${filters.keyword}%`);
  }
  const data = await db
    .select()
    .from(users)
    .where(whereClause)
    .limit(pagination.limit)
    .offset(pagination.offset);
  // You may want to implement total count with a separate query if needed
  return data;
}

export async function getUser(id: string | number) {
  const user = await db.select().from(users).where(eq(users.id, Number(id)));
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
  const [deleted] = await db.delete(users).where(eq(users.id, Number(id))).returning();
  return deleted;
}

export async function getExistingUser(data: Partial<typeof users.$inferInsert>) {
  // Example: find by email or username
  const user = await db.select().from(users).where(
    and(
      data.email ? eq(users.email, data.email) : undefined,
      data.username ? eq(users.username, data.username) : undefined
    )
  );
  return user[0] || null;
}

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
