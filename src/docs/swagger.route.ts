import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { DOC_USER, DOC_PASS, BASE_URL } from '../configs/envConfig';

const router = express.Router();

// Swagger JSDoc setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the project.',
    },
    servers: [
      {
        url: `${BASE_URL}/api/v1`,
        description: 'Base server',
      },
      {
        url: 'http://localhost:3001/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: [path.join(__dirname, '../../docs/swagger/*.yml')],
};
const swaggerSpec = swaggerJsdoc(options);

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

// Serve Swagger UI at /docs
router.use('/', docAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
