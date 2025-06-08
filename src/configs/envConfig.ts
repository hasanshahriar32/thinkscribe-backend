// Centralized environment config for all secrets and env variables
import dotenv from 'dotenv';
dotenv.config();

// List all required env vars (from .env.example and code usage)
const REQUIRED_ENV_VARS = [
  'PORT',
  'DATABASE_URL',
  'DATABASE_DIALECT',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'REFRESH_JWT_SECRET',
  'REFRESH_JWT_EXPIRES_IN',
  'FROM_EMAIL',
  'PASSWORD',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_BUCKET_NAME',
  'SMS_SENDER_ID',
  'SMS_API_KEY',
  'SMS_API_SECRET',
  'DOC_USER',
  'DOC_PASS',
  'BASE_URL',
];

// Helper to check for missing env vars (checks .env and .env.example)
export function checkMissingEnvVars() {
  const missing: string[] = [];
  for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key]) missing.push(key);
  }
  if (missing.length > 0) {
    // Warn in dev, throw in prod
    const msg = `Missing required environment variables: ${missing.join(', ')}`;
    // if (process.env.NODE_ENV === 'production') throw new Error(msg);
    // else
    console.warn(msg);
  }
}

// Export all env vars as consts (with fallback defaults if needed)
export const PORT = process.env.PORT || 2000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const DATABASE_DIALECT =
  (process.env.DATABASE_DIALECT as
    | 'postgresql'
    | 'mysql'
    | 'sqlite'
    | 'turso'
    | 'singlestore'
    | 'gel') || 'postgresql';
export const JWT_SECRET = process.env.JWT_SECRET || 'smsk-jwt-secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const REFRESH_JWT_SECRET =
  process.env.REFRESH_JWT_SECRET || 'smsk-refresh-jwt-secret';
export const REFRESH_JWT_EXPIRES_IN =
  process.env.REFRESH_JWT_EXPIRES_IN || '7d';
export const FROM_EMAIL = process.env.FROM_EMAIL || '';
export const PASSWORD = process.env.PASSWORD || '';
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';
export const SMS_SENDER_ID = process.env.SMS_SENDER_ID || '';
export const SMS_API_KEY = process.env.SMS_API_KEY || '';
export const SMS_API_SECRET = process.env.SMS_API_SECRET || '';
export const DOC_USER = process.env.DOC_USER || 'password';
export const DOC_PASS = process.env.DOC_PASS || 'admin';
export const BASE_URL = process.env.BASE_URL || 'http://localhost:2000';

// Run check on import (can be disabled in prod if needed)
checkMissingEnvVars();
