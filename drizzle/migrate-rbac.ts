import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as rbacSchema from '../src/db/schema/rbac';

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://neondb_owner:npg_HCw7a6QAiJqM@ep-cold-salad-a1hblfyk-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema: rbacSchema });

async function main() {
  await migrate(db, { migrationsFolder: './drizzle/meta' });
  console.log('✅ Migration complete');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
