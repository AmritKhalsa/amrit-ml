import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const db = drizzle(process.env.DATABASE_URL || '');


export default db;