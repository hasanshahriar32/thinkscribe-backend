import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const router = express.Router();

const swaggerPath = path.join(__dirname, '../../docs/swagger/openapi.yml');
const swaggerDocument = YAML.load(swaggerPath);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
