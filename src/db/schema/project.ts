import { pgTable, serial, text, varchar, jsonb } from 'drizzle-orm/pg-core';

interface ResearchPaper {
  id: number;
  searchId: number;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  source: string;
  sourceId: string;
  url: string;
  pdfUrl: string;
  doi: string | null;
  citations: number;
  fileSize: number | null;
  pageCount: number | null;
  language: string;
  tags: string[];
  matchScore: number;
  metadata: Record<string, any>;
  selected: boolean;
  createdAt: string;
}

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  searchId: varchar('search_id', { length: 255 }),
  pdfList: jsonb('pdf_list').$type<ResearchPaper[]>().notNull(),
});
