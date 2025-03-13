import db from '../../db/db';

export async function getActions() {
  return db.select('name', 'is_deleted').table('action');
}

export async function insertActoin() {}
