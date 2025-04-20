import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';
import helmet from 'helmet';
import './cron-jobs/sample-cron';

// Initialize the Express application
const app = express();

// Middleware to set security-related HTTP headers
app.use(helmet());

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Middleware to parse cookies attached to the client request
app.use(cookieParser());

// Logger middleware that logs each request in ISO date format, HTTP method, and URL
app.use(morgan(':date[iso] :method :url'));

// Register all application routes
app.use(routes);

// Register custom error handling middleware at the end
// This ensures it catches errors from previous middlewares or routes
app.use(errorHandler);

// Export the configured Express app for use (e.g., in server.ts)
export default app;
