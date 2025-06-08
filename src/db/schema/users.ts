import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 64 }).notNull(),
  lastName: varchar('last_name', { length: 64 }).notNull(),
  emails: jsonb('emails').notNull(), // [{ email: string, type: 'primary' | 'additional' }]
  isActive: boolean('is_active').default(true),
  isDeleted: boolean('is_deleted').default(false),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
