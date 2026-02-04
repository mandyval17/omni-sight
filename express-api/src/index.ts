import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { config } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { exampleRouter } from './modules/example/example.routes.js';
import { healthRouter } from './modules/health/health.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// Routes
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/', exampleRouter);

// Error handler (must be last)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Express API listening on http://localhost:${config.port}`);
});
