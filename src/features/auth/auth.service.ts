import { Knex } from 'knex';
import db from '../../db/db';
import { getPagination } from '../../utils/common';
import { ListQuery } from '../../types';

export async function getUser(username: string) {
  const user = await db
    .table('user')
    .select('id', 'username', 'password', 'is_deleted')
    .where('username', username);
  return user[0] || null;
}

export async function getAccessToken() {}

export async function getRefreshToken() {}

export async function hashPassword() {}

export async function verifyPassword() {}
