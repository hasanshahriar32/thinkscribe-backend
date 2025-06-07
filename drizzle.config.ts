import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/rbac.ts',
  out: './drizzle/meta',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-cold-salad-a1hblfyk-pooler.ap-southeast-1.aws.neon.tech',
    user: 'neondb_owner',
    password: 'npg_HCw7a6QAiJqM',
    database: 'neondb',
    ssl: 'require',
  },
} satisfies Config;
