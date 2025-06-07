import express from 'express';
import YAML from 'yamljs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { DOC_USER, DOC_PASS } from '../configs/envConfig';

const router = express.Router();

// Scalar API doc config (from YAML)
const swaggerPath = path.join(__dirname, '../../docs/swagger/openapi.yml');
const swaggerDocument = YAML.load(swaggerPath);

// Basic Auth Middleware for docs
const docAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = {
    login: DOC_USER,
    password: DOC_PASS,
  };
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Docs"');
  res.status(401).send('Authentication required.');
};

// Use dynamic import for ESM Scalar API Reference
router.use('/', docAuth, async (req, res) => {
  const { apiReference } = await import('@scalar/express-api-reference');
  return apiReference({ spec: { content: swaggerDocument } })(req, res);
});

export default router;
