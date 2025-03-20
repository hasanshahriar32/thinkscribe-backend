import db from '../../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function getUser(conds: Record<string, unknown>) {
  const user = await db
    .table('user')
    .select('id', 'username', 'password')
    .where(conds);
  return user[0] || null;
}

export async function getAccessToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'smsk-jwt-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  } as jwt.SignOptions);
}

export async function getRefreshToken(payload: Record<string, unknown>) {
  return jwt.sign(
    payload,
    process.env.REFRESH_JWT_SECRET || 'smsk-refresh-jwt-secret',
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN || '7d',
    } as jwt.SignOptions
  );
}

export async function verifyPassword(hashedPassword: string, password: string) {
  return bcrypt.compare(password, hashedPassword);
}
