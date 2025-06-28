import { pgTable, serial, text, varchar, jsonb } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  searchId: varchar('search_id', { length: 255 }),
  pdfList: jsonb('pdf_list').$type<Array<{ name: string; url: string; [key: string]: any }>>().notNull(),
});
