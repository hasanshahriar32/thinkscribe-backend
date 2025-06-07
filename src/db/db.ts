import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Load environment variables from .env file
dotenv.config();

// Use DATABASE_URL from environment or fallback
const connectionString = process.env.DATABASE_URL || 'postgres://neondb_owner:npg_HCw7a6QAiJqM@ep-cold-salad-a1hblfyk-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const pool = new Pool({ connectionString });
const db = drizzle(pool);

async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Postgres connection is working');
  } catch (error: any) {
    console.error('❌ Postgres connection failed:', error.message);
  }
}

testConnection();

export default db;
