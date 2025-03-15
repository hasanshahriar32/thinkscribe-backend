import express, { Response } from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(express.json());

// Routes
app.use(routes);

// Use the error handler middleware at the end
app.use(errorHandler);

export default app;
