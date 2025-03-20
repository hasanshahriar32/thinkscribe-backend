import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(routes);

// Use the error handler middleware at the end
app.use(errorHandler);

export default app;
