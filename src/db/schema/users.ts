import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  name: varchar('name', { length: 128 }),
  email: varchar('email', { length: 128 }).unique(),
  password: varchar('password', { length: 255 }).notNull(),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
