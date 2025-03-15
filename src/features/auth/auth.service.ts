import db from '../../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const EXPIRATION_TIME = '1h'; // Token expires in 1 hour

export async function getUser(username: string) {
  const user = await db
    .table('user')
    .select('id', 'username', 'password')
    .where('username', username);
  return user[0] || null;
}

export async function getAccessToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
}

export async function getRefreshToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
}

export async function verifyPassword(hashedPassword: string, password: string) {
  return bcrypt.compare(password, hashedPassword);
}
